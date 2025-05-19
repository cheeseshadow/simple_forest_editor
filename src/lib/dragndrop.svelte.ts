import type { Point } from '$lib/utils/types'
import { loadPosition, savePosition } from '$lib/utils/dragndrop'

export class Dragndrop {
	private id

	x = $state(0)
	y = $state(0)

	dragging = $state(false)

	private startPosition: Point = { x: 0, y: 0 }
	private startDragPosition: Point = { x: 0, y: 0 }

	constructor(id: string | undefined = undefined) {
		this.id = id
	}

	public init = () => {
		if (this.id) {
			const savedPosition = loadPosition(this.id)
			if (savedPosition) {
				this.x = savedPosition.x
				this.y = savedPosition.y
			}
		}
	}

	get position(): Point {
		return {
			x: this.x,
			y: this.y
		}
	}

	public startDrag = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		this.dragging = true
		this.startPosition = { x: this.x, y: this.y }
		this.startDragPosition = { x: e.clientX, y: e.clientY }

		const handleMouseMove = (e: MouseEvent): void => {
			this.updateDrag(e)
		}

		const handleMouseUp = (): void => {
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUp)
			this.dragging = false
			this.savePosition()
		}

		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleMouseUp)
		window.addEventListener('mouseleave', handleMouseUp)
	}

	private updateDrag = (e: MouseEvent) => {
		const dx = e.clientX - this.startDragPosition.x
		const dy = e.clientY - this.startDragPosition.y
		this.x = this.startPosition.x + dx
		this.y = this.startPosition.y + dy
	}

	private savePosition = () => {
		if (!this.id) return
		savePosition(this.id, { x: this.x, y: this.y })
	}
}
