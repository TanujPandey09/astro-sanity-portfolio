import React, {useState} from 'react'
import {useDocumentOperation} from 'sanity'

const SUPPORTED_TYPES = new Set(['projects', 'blogs', 'templates'])

const resolveAiEndpoint = () => {
  if (typeof process !== 'undefined' && process.env?.SANITY_STUDIO_AI_API_URL) {
    return process.env.SANITY_STUDIO_AI_API_URL
  }
  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'http://localhost:4321/api/sanity-ai'
    }
  }
  return 'https://tanujbuilds.site/api/sanity-ai'
}

const isEmptyValue = (val) => {
  if (val === undefined || val === null) return true
  if (typeof val === 'string') return val.trim().length === 0
  if (Array.isArray(val)) return val.length === 0
  if (typeof val === 'object' && val._type === 'slug') return !val.current
  return false
}

export function GenerateWithAiAction(props) {
  const {id, type, draft, published, onComplete} = props
  const {patch} = useDocumentOperation(id, type)

  const [isOpen, setIsOpen] = useState(false)
  const [notes, setNotes] = useState('')
  const [overwrite, setOverwrite] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!SUPPORTED_TYPES.has(type)) {
    return null
  }

  const doc = draft || published || {}
  const title = doc.projectName || doc.templateName || doc.adminstrativetitle || ''

  const handleGenerate = async () => {
    setLoading(true)
    setError('')

    try {
      const endpoint = resolveAiEndpoint()
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          docType: type,
          title,
          notes,
          tags: Array.isArray(doc.tags) ? doc.tags : [],
        }),
      })

      const data = await response.json()
      if (!response.ok || !data?.patch) {
        throw new Error(data?.error || `Request failed (${response.status})`)
      }

      const nextSet = {}
      Object.entries(data.patch).forEach(([field, value]) => {
        if (overwrite || isEmptyValue(doc[field])) {
          nextSet[field] = value
        }
      })

      if (Object.keys(nextSet).length === 0) {
        setError('All target fields already have content. Enable "Overwrite existing fields" to replace them.')
        setLoading(false)
        return
      }

      patch.execute([{set: nextSet}])
      setIsOpen(false)
      setNotes('')
      onComplete()
    } catch (err) {
      setError(err?.message || 'Could not reach AI endpoint. Make sure your site or localhost:4321 is running.')
    } finally {
      setLoading(false)
    }
  }

  return {
    label: loading ? 'Generating...' : 'Generate with AI',
    tone: 'primary',
    disabled: loading,
    onHandle: () => {
      setError('')
      setIsOpen(true)
    },
    dialog: isOpen && {
      type: 'dialog',
      onClose: () => {
        if (!loading) {
          setIsOpen(false)
          onComplete()
        }
      },
      header: 'Generate Draft with Gemini AI',
      content: React.createElement(
        'div',
        {style: {display: 'flex', flexDirection: 'column', gap: '14px', padding: '4px 0'}},
        React.createElement(
          'p',
          {style: {margin: 0, fontSize: '13px', opacity: 0.8, lineHeight: 1.5}},
          title
            ? `Generating structured content for "${title}". Paste rough bullet points, stack details, or outcomes below:`
            : 'Add a Title on this document first, or paste rough bullet points below:'
        ),
        React.createElement('textarea', {
          value: notes,
          onChange: (e) => setNotes(e.target.value),
          rows: 6,
          placeholder:
            'Example:\n- Built multi-tenant SaaS for clinic scheduling with Next.js + PostgreSQL\n- Reduced booking drop-off with real-time slot locking\n- Handled RBAC for admin, doctors, and patients',
          style: {
            width: '100%',
            padding: '10px 12px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontFamily: 'inherit',
            fontSize: '13px',
            lineHeight: 1.5,
            boxSizing: 'border-box',
          },
        }),
        React.createElement(
          'label',
          {style: {display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer'}},
          React.createElement('input', {
            type: 'checkbox',
            checked: overwrite,
            onChange: (e) => setOverwrite(e.target.checked),
          }),
          'Overwrite existing fields (unchecked = only fill empty fields)'
        ),
        error
          ? React.createElement(
              'div',
              {
                style: {
                  padding: '10px 12px',
                  borderRadius: '6px',
                  background: '#fef2f2',
                  color: '#b91c1c',
                  fontSize: '12px',
                  lineHeight: 1.4,
                },
              },
              error
            )
          : null,
        React.createElement(
          'div',
          {style: {display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px'}},
          React.createElement(
            'button',
            {
              type: 'button',
              disabled: loading,
              onClick: () => {
                setIsOpen(false)
                onComplete()
              },
              style: {
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '13px',
              },
            },
            'Cancel'
          ),
          React.createElement(
            'button',
            {
              type: 'button',
              disabled: loading,
              onClick: handleGenerate,
              style: {
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                background: '#2563EB',
                color: '#ffffff',
                fontWeight: 600,
                cursor: loading ? 'wait' : 'pointer',
                fontSize: '13px',
              },
            },
            loading ? 'Generating with Gemini...' : 'Generate Draft'
          )
        )
      ),
    },
  }
}
