const text = `It's my friends' wedding.
Take Tom's car
This is my dog's ball.
We will be living in her parent's home.
Bring Kat's and Peter's laptops.
He ate Dasha's apple.
Piter's friends coming tomorrow.
Jon's and Mary's phones lie on the table...

He said, 'I love my wife.'
He asked, 'What are you doing?'
Mike was told, 'They will arrive tomorrow.'
Alex asked, 'Did you go to the party yesterday?'
'Bring me the kids' menus'`;

const reqexp1 = /'/g;
const reqexp2 = /(?!s'|[a-z]'[a-z])([\s\S])'|^'/g;

const text1 = text.replace(reqexp1, '"'); 
const text2 = text.replace(reqexp2, '$1"');

console.log(`text: ${text}`);
console.log(`text1: ${text1}`);
console.log(`text2: ${text2}`);
