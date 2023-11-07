import { Db } from 'mongodb'
import { createMachine, createActor } from 'xstate'

const resourceMachine = createMachine({
  id: 'Resource',
  initial: 'undefined',
  states: {
    undefined: { on: { 
      Creating: { target: 'Created', guard: 'Cancelled' },
    } },
    Created: { on: { 
      Updating: { target: 'Updated', guard: 'Cancelled' },
      Deleting: { target: 'Deleting', guard: 'Cancelled' },
    } },
    Updated: { on: { 
      Updating: { target: 'Updated', guard: 'Cancelled' },
      Deleting: { target: 'Deleting', guard: 'Cancelled' },
    } },
    Cancelled: { on: { Toggle: 'inactive' } },
    Deleted: { type: 'final' },
  },
})

// Machine instance with internal state
const streamingService = (db: Db) => {

  const documentService = createActor(resourceMachine).start()
  documentService.subscribe((state) => console.log(state.value))
  documentService.send({ type: 'Toggle' })
  documentService.send({ type: 'Toggle' })

}



// Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.
const toggleMachine = createMachine({
  id: 'Switch',
  initial: 'inactive',
  states: {
    inactive: { on: { Toggle: 'active' } },
    active: { on: { Toggle: 'inactive' } },
  },
})

// Machine instance with internal state
const toggleService = createActor(toggleMachine).start()
toggleService.subscribe((state) => console.log(state.value))
// => 'inactive'

toggleService.send({ type: 'Toggle' })
// => 'active'

toggleService.send({ type: 'Toggle' })
// => 'inactive'
