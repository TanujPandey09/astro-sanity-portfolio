import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {deskStructure} from './structure'
import {GenerateWithAiAction} from './actions/generateWithAiAction'

export default defineConfig({
  name: 'default',
  title: 'Portfolio & NovaStack Studio',

  projectId: 'fqd3bez7',
  dataset: 'production',

  plugins: [structureTool({structure: deskStructure}), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      if (['projects', 'blogs', 'templates'].includes(context.schemaType)) {
        return [...prev, GenerateWithAiAction]
      }
      return prev
    },
  },
})
