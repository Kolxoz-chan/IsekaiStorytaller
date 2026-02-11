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
		CanvasManager.clear()
		for (const system of this.systems) 
		{
			system.update(this)
		}
		CanvasManager.resetTransform()
		
		setTimeout(() => {this.update()}, 1000 / 60)
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
	
	getEntity(id)
	{
		return this.entities.get(id)
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
	
	query(comps_list = [])
	{
		let entities = new Set()
		if(comps_list.length > 0)
		{
			entities = this.components.get(comps_list[0])
			for(let i=1; i<comps_list.length; i++)
			{
				let name = comps_list[i]
				entities = entities.intersection(this.components.get(name)) 
			}
		}
		return entities
	}
	
	registerSystem(system)
	{
		this.systems.push(system)
		system.init(this)
	}
	
	start()
	{
		this.update()
	}
}
