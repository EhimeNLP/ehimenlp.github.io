import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        page: defineCollection({
            type: 'page',
            source: '*.md'
        }),
        infos: defineCollection({
            type: 'page',
            source: 'infos/*.md',
            schema: z.object({
                title: z.string(),
                date: z.date()
            })
        })
    }
})