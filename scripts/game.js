class Game
{	
	constructor()
	{
		this.components = new Map()
		this.entities = new Map()
		this.systems = []
		this.entity_counter = 0
	}
	
	update()
	{
		for (const system of this.systems) 
		{
			system.update(this)
		}
	}
	
	addEntity(components = {})
	{
		let id = this.entity_counter
		this.entity_counter++
		
		this.entities.set(id, new Map())
		
		for (const name in components)
		{
			this.addComponent(id, name, components[name])
		}
		
		return id
	} 
	
	addComponent(entity, component, data)
	{
		
		if(!this.entities.has(entity))
		{
			this.entities.set(id, new Map())
		}
		this.entities.get(entity).set(component, data)
		
		
		if(!this.components.has(component))
		{
			this.components.set(component, new Set())
		}
		this.components.get(component).add(entity)
	}
	
	registerSystem(system)
	{
		this.systems.push(system)
		system.init()
	}
}
