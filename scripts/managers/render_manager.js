class RenderManager
{
	static init()
	{
		this.strategies_list = {}
	}
	
	static addStrategy(name, obj)
	{
		this.textures_list[name] = obj
	}
	
	static getStrategy(name)
	{
		if(name in this.strategies_list)
		{
			return this.strategies_list[name]
		}
		return null
	}
	
	static execStrategy(name, game, entity)
	{
		let strategy = this.getStrategy(name)
		if(strategy)
		{
			strategy.exec(game, entity)
		}
		else
		{
			console.error("Strategy", name, "is not found!")
		}
	}
}

class RenderStrategy
{
	exec(game, entity){}
}

class SpriteRenderStrategy extends RenderStrategy
{
	exec(game, entity)
	{
		let components = game.getEntity(entity)
		let position = components.get("Position")
		let texture = components.get("Texture")
		let img = ResourcesManager.getTexture(texture.texture)
		
		if(texture.offset)
		{
			position = {
				x : position.x + texture.offset.x,
				y : position.y + texture.offset.y
			}
		}
		
		CanvasManager.drawImage(img, position.x, position.y, img.width, img.height)
	}
}
