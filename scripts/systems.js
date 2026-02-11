class TextureRenderSystem
{
	init(game)
	{
		
	}
	
	update(game)
	{
		let entities = game.query(["Texture", "Position"])
		for (let id of entities)
		{
			
			let components = game.getEntity(id)
			let position = components.get("Position")
			let texture = components.get("Texture")
			let img = ResourcesManager.getTexture(texture.texture)
			
			CanvasManager.drawImage(img, position.x, position.y, img.width, img.height)
		}
	}
}

class PlayerContollerSystem
{
	init(game)
	{
		
	}
	
	update(game)
	{
		let entities = game.query(["Player", "Position", "Speed"])
		for (let id of entities)
		{
			let components = game.getEntity(id)
			let position = components.get("Position")
			let speed = components.get("Speed")
			
			if (EventsManager.isKeyPressed("KeyW")) position.y -= speed.speed
			else if (EventsManager.isKeyPressed("KeyA")) position.x -= speed.speed
			else if (EventsManager.isKeyPressed("KeyS")) position.y += speed.speed
			else if (EventsManager.isKeyPressed("KeyD")) position.x += speed.speed

		}
	}
}

class CameraContollerSystem
{
	init(game)
	{
		
	}
	
	update(game)
	{
		let entities = game.query(["Camera", "Position"])
		for (let id of entities)
		{
			let components = game.getEntity(id)
			let position = components.get("Position")
			let camera = components.get("Camera")
			
			CanvasManager.setCameraCenter(position.x, position.y)
		}
	}
}

