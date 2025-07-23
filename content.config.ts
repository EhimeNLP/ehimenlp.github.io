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
        }),
        awards: defineCollection({
            type: 'data',
            source: 'papers/awards/*.yaml',
            schema: z.object({
                department: z.string(),
                award_name: z.string(),
                award_link: z.string().optional(),
                date: z.date(),
                members: z.array(z.string()),
                only_first_author: z.boolean(),
                title: z.string()
            })
        }),
        international_papers: defineCollection({
            type: 'data',
            source: 'papers/international_papers/*.yaml',
            schema: z.object({
                members: z.array(z.string()),
                title: z.string(),
                tags: z.array(z.string()),
                date: z.date(),
                info: z.string(),
                pdf_link: z.string().optional(),
                code_link: z.string().optional(),
                data_link: z.string().optional()
            })
        })
    }
})
