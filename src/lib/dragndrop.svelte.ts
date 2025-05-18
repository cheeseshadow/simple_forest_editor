import type { Point } from '$lib/utils'

export class Dragndrop {
	private id

	x = $state(0)
	y = $state(0)

	dragging = $state(false)

	private startX = 0
	private startY = 0
	private startDragX = 0
	private startDragY = 0

	constructor(id: string | undefined = undefined) {
		this.id = id
	}

	public init = () => {
		if (this.id) {
			const savedPosition = sessionStorage.getItem('dragndrop' + this.id)
			if (savedPosition) {
				const { x, y } = JSON.parse(savedPosition)
				this.x = x
				this.y = y
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
		this.startX = this.x
		this.startY = this.y
		this.startDragX = e.clientX
		this.startDragY = e.clientY

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
		const dx = e.clientX - this.startDragX
		const dy = e.clientY - this.startDragY
		this.x = this.startX + dx
		this.y = this.startY + dy
	}

	private savePosition = () => {
		if (!this.id) return
		sessionStorage.setItem('dragndrop' + this.id, JSON.stringify({ x: this.x, y: this.y }))
	}
}
