import {useSanityClient,groq} from "astro-sanity"

export async function getFirst(){
    const query = groq`*[_type == "sideBar"]{
        ...,
        sideMenus[]->
    }`;
    const firstPost = await useSanityClient().fetch(query);
    return firstPost;
}




