const createShelfNumArr = (number = 4, groupName = 'Shelf') => {
	return new Array(number).fill(0).map((item, index) => {
		return {
			label: groupName,
			name: index + 1,
			value: `${groupName}${index + 1}`,
			groups: createRackNumArr()
		};
	});
};

const createRackNumArr = (number = 6, groupName = 'Rack') => {
	return new Array(number).fill(0).map((item, index) => {
		return {
			label: groupName,
			name: index + 1,
			value: `${groupName}${index + 1}`,
			groups: createRackShelfNumArr()
		};
	});
};

const createRackShelfNumArr = (number = 4, groupName = 'RackShelf') => {
	return new Array(number).fill(0).map((item, index) => {
		return {
			label: groupName,
			name: index + 1,
			value: `${groupName}${index + 1}`,
			groups: createBoxNumArr()
		};
	});
};

const createBoxNumArr = (number = 5, groupName = 'Box') => {
	return new Array(number).fill(0).map((item, index) => {
		return {
			label: groupName,
			name: index + 1,
			value: `${groupName}${index + 1}`,
			groups: createSlotNumArr()
		};
	});
};
const word = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

// 产生A0 - A10 B0-B9 C0-C9 D0-D9
const createSlotNumArr = (number = 100, groupName = 'Slot') => {
	return new Array(number).fill(0).map((item, index) => {
		return {
			label: groupName,
			name: `${word[Math.floor(index / 10)]}${index % 10}`,
			value: `${word[Math.floor(index / 10)]}${index % 10}`,
			groups: []
		};
	});
};

export const dataList = [
	{
		name: 'Freezer',
		children: [
			{
				label: 'Freezer',
				name: 'A',
				value: 'FreezerA',
				groups: createShelfNumArr(4, 'Shelf')
			},
			{
				label: 'Freezer',
				name: 'B',
				value: 'FreezerB',
				groups: createShelfNumArr(4, 'Shelf')
			},
			{
				label: 'Freezer',
				name: 'C',
				value: 'FreezerC',
				groups: createShelfNumArr(4, 'Shelf')
			}
		]
	}
];
