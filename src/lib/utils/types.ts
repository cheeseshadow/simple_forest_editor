import type { Gender } from '$lib/utils/drawing'

export type Item = {
	id: string
	name: string
	job: string
	gender: Gender
	mother: number | null
	father: number | null
}

export type Point = {
	x: number
	y: number
}

export type Line = {
	start: Point
	end: Point
}
