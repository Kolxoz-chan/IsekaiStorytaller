class BaseSystem
{
	init(game)
	{
		
	}
}

class TextureRenderSystem extends BaseSystem
{
	update(game)
	{
		let entities = game.query(["Texture", "Position"])
		for (let id of entities)
		{
			let camera = CanvasManager.camera
			let components = game.getEntity(id)
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
}

class PlayerContollerSystem extends BaseSystem
{
	update(game)
	{
		let entities = game.query(["MotionController", "Velocity", "Speed"])
		for (let id of entities)
		{
			let components = game.getEntity(id)
			let controller = components.get("MotionController")
			let velocity = components.get("Velocity")
			let speed = components.get("Speed")
			
			if(controller.reset_velocity)
			{
				velocity.dx = 0
				velocity.dy = 0
			}
			
			if (EventsManager.isKeyPressed("KeyW")) 
			{
				velocity.dy -= speed.speed	
				if(!controller.diagonal_movement) continue
			}
			if (EventsManager.isKeyPressed("KeyA")) 
			{
				velocity.dx -= speed.speed
				if(!controller.diagonal_movement) continue
			}
			if (EventsManager.isKeyPressed("KeyS")) 
			{
				velocity.dy += speed.speed
				if(!controller.diagonal_movement) continue
			}
			if (EventsManager.isKeyPressed("KeyD")) 
			{
				velocity.dx += speed.speed
				if(!controller.diagonal_movement) continue
			}

		}
	}
}

class CameraContollerSystem extends BaseSystem
{
	update(game)
	{
		let entities = game.query(["CameraController", "Position"])
		for (let id of entities)
		{
			let components = game.getEntity(id)
			let position = components.get("Position")
			let camera = components.get("CameraController")
			
			if(camera.lerp)
			{
				position = MathManager.lerp_vector(CanvasManager.camera, position, camera.lerp)
			}
			
			CanvasManager.setCameraCenter(position.x, position.y)
		}
	}
}

class ChunkRenderSystem extends BaseSystem
{
	update(game)
	{
		let entities = game.query(["Chunk", "ChunkFilling", "Position"])
		for (let id of entities)
		{
			let components = game.getEntity(id)
			let position = components.get("Position")
			let chunk = components.get("Chunk")
			let filling = components.get("ChunkFilling")
			let img = ResourcesManager.getTexture(filling.texture)
			
			for(let x=-chunk.cols/2; x<chunk.cols/2; x+=1)
			{
				for(let y=-chunk.rows/2; y<chunk.rows/2; y+=1)
				{
					CanvasManager.drawImage(
						img, 
						position.x + (x * chunk.tile_width), 
						position.y + (y * chunk.tile_height), 
						chunk.tile_width, 
						chunk.tile_height
					)
				}
			}
		}
	}
}

class GridPositionSystem extends BaseSystem
{
	update(game)
	{
		let entities = game.query(["GridPosition", "GridCellSize"])
		for (let id of entities)
		{
			let components = game.getEntity(id)
			let grid = components.get("GridPosition")
			let size = components.get("GridCellSize")
			
			let abs_pos = {x : grid.x * size.width, y : grid.y * size.height}
			
			if(!components.has("Position"))
			{
				game.addComponent(id, "Position", abs_pos)
			}
			let position = components.get("Position")
			
			if(components.has("Speed"))
			{
				let speed = components.get("Speed")
				let pos = MathManager.moveTo(position, abs_pos, speed.speed)
				
				position.x = pos.x
				position.y = pos.y
			}
			else
			{
				position.x = abs_pos.x
				position.y = abs_pos.y
			}
		}
	}
}

class GridControllerSystem extends BaseSystem
{
	update(game)
	{
		let entities = game.query(["GridController", "GridPosition", "GridCellSize", "Position"])
		for (let id of entities)
		{
			let components = game.getEntity(id)
			let position = components.get("Position")
			let grid = components.get("GridPosition")
			let size = components.get("GridCellSize")
			
			let pos_x = grid.x * size.width
			let pos_y = grid.y * size.height
			let cond = (position.x == pos_x) && (position.y == pos_y)
			
			if (EventsManager.isKeyPressed("KeyW") && cond) 
			{
				grid.y -= 1
			}
			else if (EventsManager.isKeyPressed("KeyA") && cond) 
			{
				grid.x -= 1
			}
			else if (EventsManager.isKeyPressed("KeyS") && cond) 
			{
				grid.y += 1
			}
			else if (EventsManager.isKeyPressed("KeyD") && cond) 
			{
				grid.x += 1
			}
		}
	}
}

class GridCollisionSystem extends BaseSystem
{
	update(game)
	{
		let entities = game.query(["GridPosition", "GridCellSize", "Position"])
		for (let ent_1 of entities)
		{
			let components_1 = game.getEntity(ent_1)
			let grid_1 = components_1.get("GridPosition")
			
			for (let ent_2 of entities)
			{
				if(ent_1 != ent_2)
				{
					let components_2 = game.getEntity(ent_2)
					let grid_2 = components_2.get("GridPosition")
					
					if(grid_1.x == grid_2.x && grid_1.y == grid_2.y)
					{
						let position_1 = components_1.get("Position")
						let size_1 = components_1.get("GridCellSize")
						grid_1.x = Math.round(position_1.x / size_1.width)
						grid_1.y = Math.round(position_1.y / size_1.height)
						position_1.x = grid_1.x * size_1.width
						position_1.y = grid_1.y * size_1.height
					}
				}
			}
			
		}
	}
}
