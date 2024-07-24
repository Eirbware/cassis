import { defineMongooseModel } from '#nuxt/mongoose'

export const LinkShema = defineMongooseModel<Link>({
  name: 'link',
  schema: {
    url: {
      type: String,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    createdBy: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: false
    },
    visited: {
      type: Number,
      required: true
    }
  }
})
