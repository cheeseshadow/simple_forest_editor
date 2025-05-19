import type { Line, Point } from '$lib/utils/types'

export type Gender = 'male' | 'female'

export const assumeGenderColor = (gender: Gender) => {
	switch (gender) {
		case 'female':
			return '#F7C6D9'

		case 'male':
			return '#A7C7E7'
	}
}

export const getCenter = (element: HTMLDivElement, offset: Point): Point => {
	return {
		x: element.offsetLeft + element.offsetWidth / 2 + offset.x,
		y: element.offsetTop + element.offsetHeight / 2 + offset.y
	}
}

export const getMiddle = (point1: Point, point2: Point): Point => {
	return {
		x: (point1.x + point2.x) / 2,
		y: (point1.y + point2.y) / 2
	}
}

export const drawLines = (
	lines: Line[],
	ctx: CanvasRenderingContext2D,
	color: string,
	width: number = 6
) => {
	ctx.strokeStyle = color
	ctx.lineWidth = width
	ctx.beginPath()
	for (const line of lines) {
		ctx.moveTo(line.start.x, line.start.y)
		ctx.lineTo(line.end.x, line.end.y)
	}
	ctx.stroke()
}
