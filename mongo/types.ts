import type { MongoClient, Db, Collection, InsertOneResult, BSON, ObjectId } from 'mongodb'

export let client: MongoClient
export let db: Db
export let cache: Collection
export let cacheTTL: number
export let events: Collection
export let queue: Collection
export let actors: Collection

export type DBConfig = {
  client: MongoClient
  db?: Db | string
  cache?: Collection | string
  cacheTTL?: number
  actors?: Collection | string
  events?: Collection | string
  queue?: Collection | string
}

export type Stream = {
  // 彡: Data
  // 巛: Events
  // 入: Actions
  client: MongoClient
  database: Db
  cache: Collection
  cacheTTL: number
  machines: Collection
  events: Collection
  queue: Collection
  send: (input: QueueInput | QueueInput[]) => Promise<InsertOneResult<any>>
}

export type QueueConfig = Stream & {
  batchSize?: number
  concurrency?: number
  lockExpiration?: number
}

export type QueueInputMerge = {
  into: string
  on?: BSON.Document
  let?: BSON.Document
  contentAs?: string
  itemsAs?: string
  functionDataAs?: string
  forEachItem?: boolean
}
export type QueueInput<T = BSON.Document> = T & {
  _id?: ObjectId
  metadata?: object
  merge?: string | QueueInputMerge
  target?: string
}

export type QueueDocument = QueueInput & {
  lockedAt: Date
  lockedBy: string
}
