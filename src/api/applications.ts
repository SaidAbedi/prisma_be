import Router from 'express'

const applicationsRouter = Router()

// for applications
applicationsRouter.get('/', (req, res) => {})
applicationsRouter.get('/:id', (req, res) => {})
applicationsRouter.post('/', (req, res) => {})
applicationsRouter.put('/:id', (req, res) => {})
applicationsRouter.delete('/:id', (req, res) => {})

export default applicationsRouter