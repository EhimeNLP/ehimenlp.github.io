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
            source: 'achivements/awards/*.yaml',
            schema: z.object({
                text_md: z.string(),
                tags: z.array(z.string()),
                date: z.date(),
                pdf_link: z.string().optional(),
                code_link: z.string().optional(),
                data_link: z.string().optional()
            })
        }),
        papers: defineCollection({
            type: 'data',
            source: 'achivements/papers/*.yaml',
            schema: z.object({
                text_md: z.string(),
                tags: z.array(z.string()),
                date: z.date(),
                pdf_link: z.string().optional(),
                code_link: z.string().optional(),
                data_link: z.string().optional()
            })
        }),
        journals: defineCollection({
            type: 'data',
            source: 'achivements/journals/*.yaml',
            schema: z.object({
                text_md: z.string(),
                tags: z.array(z.string()),
                date: z.date(),
                pdf_link: z.string().optional(),
                code_link: z.string().optional(),
                data_link: z.string().optional()
            })
        }),
        international_papers: defineCollection({
            type: 'data',
            source: 'achivements/international_papers/*.yaml',
            schema: z.object({
                text_md: z.string(),
                tags: z.array(z.string()),
                date: z.date(),
                pdf_link: z.string().optional(),
                code_link: z.string().optional(),
                data_link: z.string().optional()
            })
        }),
        others: defineCollection({
            type: 'data',
            source: 'achivements/others/*.yaml',
            schema: z.object({
                text_md: z.string(),
                tags: z.array(z.string()),
                date: z.date(),
                pdf_link: z.string().optional(),
                code_link: z.string().optional(),
                data_link: z.string().optional()
            })
        })
    }
})
