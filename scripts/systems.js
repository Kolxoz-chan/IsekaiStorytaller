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
		let entities = game.query(["GridPosition", "GridCellSize", "Position"])
		for (let id of entities)
		{
			let components = game.getEntity(id)
			let position = components.get("Position")
			let grid = components.get("GridPosition")
			let size = components.get("GridCellSize")
			
			position.x = grid.x * size.width
			position.y = grid.y * size.height
		}
	}
}

class GridMotionSystem extends BaseSystem
{
	update(game)
	{
		let entities = game.query(["GridPosition", "Velocity"])
		for (let id of entities)
		{
			let components = game.getEntity(id)
			let grid = components.get("GridPosition")
			let velocity = components.get("Velocity")
			
			grid.x += velocity.dx
			grid.y += velocity.dy
			
			if (velocity.dx == 0 && velocity.dy == 0)
			{
				let pos = MathManager.moveTo(grid, {x : Math.round(grid.x), y : Math.round(grid.y)}, 0.1)
				grid.x = pos.x
				grid.y = pos.y
			}
		}
	}
}

class GridCollisionSystem extends BaseSystem
{
	update(game)
	{
		let entities = game.query(["GridCollider", "GridPosition", "Velocity"])
		for (let ent_1 of entities)
		{
			let components_1 = game.getEntity(ent_1)
			
			for (let ent_2 of entities)
			{
				if(ent_1 == ent_2) continue;
				let components_2 = game.getEntity(ent_2)
				
				let velocity = components_2.get("Velocity")
				let grid_1 = components_1.get("GridPosition")
				let grid_2 = components_2.get("GridPosition")

				 
				let rect_1 = {
					x : grid_1.x, 
					y : grid_1.y, 
					width : 1, 
					height : 1
				}
				
				let rect_2 = {
					x : grid_2.x, 
					y : grid_2.y, 
					width : 1, 
					height : 1
				}
				
				if(MathManager.isIntersectsRects(rect_1, rect_2) || MathManager.isIntersectsRects(rect_2, rect_1))
				{
					console.log(rect_1, rect_2) 
					grid_2.x -= velocity.dx
					grid_2.y -= velocity.dy
				}
			}
		}
	}
}
