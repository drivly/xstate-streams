import { ObjectId } from 'mongodb'
import Schema from 'schema-dts'

type collections = {
  blogs: Blog
  posts: Post
  authors: Author
}

type Blog = Schema.Blog & {
  _id: ObjectId
  name: string
  domain?: string
  topics?: string[]
  description?: string
  posts?: ObjectId[] | Post[]
}

type Post = Schema.BlogPosting & {
  _id: ObjectId
  blog?: ObjectId | Blog
  title: string
  slug: string
  author?: ObjectId | Author | ObjectId[] | Author[]
  content: string
  published?: boolean
  publishedAt?: Date
}

type Author = Schema.Person & {
  _id: ObjectId
  name: string
  title: string
  email: string
  bio: string
}