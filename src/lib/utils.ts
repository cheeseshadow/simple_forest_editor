export type Gender = 'male' | 'female'

export type Item = {
	id: number
	name: string
	job: string
	gender: Gender
	mother: number
	father: number
}

export const assumeGenderColor = (gender: Gender) => {
	switch (gender) {
		case 'female':
			return '#F7C6D9' // Hot Pink

		case 'male':
			return '#A7C7E7'
	}
}
