test('add 1+2 to equal 3',()=>{
	const sum = require('../pages/tutorialsum');
	expect(sum(1,2)).toBe(3);
});