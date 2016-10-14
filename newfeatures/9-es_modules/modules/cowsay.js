
const cowsay = whatYaSay => console.log(
` _${'_'.repeat(whatYaSay.length)}_
< ${whatYaSay} >
 _${'_'.repeat(whatYaSay.length)}_
        \\   ^__^
         \\  (oo)\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`)

cowsay('all devs in the house say heeeyo')

export default cowsay
