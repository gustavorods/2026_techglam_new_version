/* Catálogo TechGlam; fotografias fornecidas em assets/Techglam images. */
const PRODUCTS=[
 {id:'blush-bastao',name:'Blush Bastão',category:'Blush em bastão',desc:'Cinco opções de cor para diferentes estilos.',price:45,tone:'rosados',options:[['01','Rosé','Romântico','#cf829a'],['02','Pêssego','Natural','#dc9a83'],['03','Malva','Moderno','#a77a98'],['04','Bronze','Iluminador','#bd8968'],['05','Berry','Intenso','#964d70']]},
 {id:'blush-liquido',name:'Blush Líquido',category:'Blush líquido',desc:'Cor e leveza em cinco opções.',price:45,tone:'rosados',options:[['01','Rosé','Romântico','#cf829a'],['02','Pêssego','Natural','#dc9a83'],['03','Malva','Moderno','#a77a98'],['04','Cushion','Efeito leve e difuso','#dbafbd'],['05','Berry','Intenso','#964d70']]},
 {id:'paleta-blush',name:'Paleta de Blush',category:'Paletas de blush',desc:'Cinco versões para diferentes estilos.',price:50,tone:'rosados',options:[['01','Rosé','Romântico','#cf829a'],['02','Pêssego','Natural','#dc9a83'],['03','Malva','Moderno','#a77a98'],['04','Bronze','Iluminador','#bd8968'],['05','Berry','Intenso','#964d70']]},
 {id:'paleta-sombra',name:'Paleta de Sombra',category:'Paletas de sombra',desc:'Seis versões para criar combinações.',price:70,tone:'neutros',options:[['01','Nude Essencial','Versatilidade e elegância para todo dia','#b28a78'],['02','Golden Hour','Brilho e sofisticação em todos os momentos','#cda461'],['03','Bronze Vibes','A intensidade do bronze com um toque de glamour','#a16b49'],['04','Pink Mood','Cor, atitude e personalidade em cada olhar','#d36c9a'],['05','Moonlight','Para um olhar marcante e inesquecível','#6f6e9b'],['06','Rainbow','Cores que realçam o que te torna única','linear-gradient(45deg,#e05c85,#f3bd56,#6dbfa2,#7772c7)']]},
 {id:'lip-gloss',name:'Lip Gloss Tradicional',category:'Lip gloss',desc:'Brilho para os lábios em seis tonalidades.',price:46,tone:'rosados',options:[['01','Rosa Cristal','Brilho delicado e glamuroso','#e9b8c8'],['02','Pink Intenso','Cor vibrante com brilho irresistível','#d74983'],['03','Cereja Suave','Traz vida e frescor aos lábios','#bf6175'],['04','Ameixa Suave','Tom ameixa com brilho delicado','#99516f'],['05','Chocolate Mauve','Marrom com toque malva','#876075'],['06','Vinho Elegante','Cor vinho marcante','#79394d']]},
 {id:'lip-oil-fruits',name:'Lip Oil Fruits',category:'Lip oil',desc:'Lip oil em cinco opções inspiradas em frutas.',price:46,tone:'vibrantes',options:[['01','Melancia','','#e7717e'],['02','Mirtilo','','#7772a9'],['03','Morango','','#d65e73'],['04','Pêssego','','#e7aa82'],['05','Cereja','','#b94f65']]},
 {id:'kit-esponjas',name:'Kit Esponjas',category:'Pincéis e esponjas',desc:'Kit de esponjas para aplicar maquiagem.',price:30,tone:'neutros'},
 {id:'kit-pinceis',name:'Kit Pincéis',category:'Pincéis e esponjas',desc:'Kit de pincéis para aplicar maquiagem.',price:50,tone:'neutros'},
 {id:'maquina-glamix',name:'Impressora de Maquiagem Glamix',category:'Linha Tecnológica TechGlam',desc:'Impressora inteligente conectada a um aplicativo para criar tonalidades de maquiagem personalizadas. Acompanha cinco cartuchos: vermelho, azul, amarelo, branco e preto. Prepara e libera o produto pela parte inferior para guardar em recipiente portátil com tampa. Possui espelho na tampa superior e pincel acoplado.',price:1650,tone:'neutros'},
 {id:'kit-cartuchos',name:'Kit com 5 Cartuchos Glamix',category:'Linha Tecnológica TechGlam',desc:'Kit de reposição exclusivo para a Impressora Glamix com pigmentos vermelho, azul, amarelo, branco e preto.',price:500,tone:'vibrantes'},
 {id:'cartucho-individual',name:'Cartucho Individual / Refil Glamix',category:'Linha Tecnológica TechGlam',desc:'Refil exclusivo para a Impressora Glamix. Substitua somente o pigmento esgotado.',price:120,tone:'vibrantes',options:[['01','Vermelho','Pigmento de reposição','#c84b55'],['02','Azul','Pigmento de reposição','#547dbb'],['03','Amarelo','Pigmento de reposição','#e3bd4a'],['04','Branco','Pigmento de reposição','#f0efeb'],['05','Preto','Pigmento de reposição','#303039']]}
];
const slug=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
for(const product of PRODUCTS){
 const sources=REAL_IMAGES.products[product.id];
 product.variants=(product.options||[]).map(([number,name,description,swatch])=>{const id=`${product.id}-${slug(name)}`;return{id,number,name,description,swatch,images:(sources?.[Number(number)]||[]).map((src,index)=>({id:`${id}-${index+1}`,src:encodeURI(src),alt:`${product.name} — ${name}, foto ${index+1}`}))};});
 product.images=product.variants.length?product.variants[0].images:(sources||[]).map((src,index)=>({id:`${product.id}-${index+1}`,src:encodeURI(src),alt:`${product.name}, foto ${index+1}`}));
 product.image=product.images[0].src;
 delete product.options;
}
const CATEGORIES=['Blush em bastão','Blush líquido','Paletas de blush','Paletas de sombra','Lip gloss','Lip oil','Pincéis e esponjas','Linha Tecnológica TechGlam'];
const CATEGORY_FEATURES=[
 {name:'Blush em bastão',product:'blush-bastao',subtitle:'Sua cor, seu jeito'},
 {name:'Blush líquido',product:'blush-liquido',subtitle:'Leveza e cor'},
 {name:'Paletas de blush',product:'paleta-blush',subtitle:'Cinco estilos'},
 {name:'Paletas de sombra',product:'paleta-sombra',subtitle:'Crie combinações'},
 {name:'Lábios',category:'Lip gloss',product:'lip-gloss',subtitle:'Cor e brilho'},
 {name:'Glamix',category:'Linha Tecnológica TechGlam',product:'maquina-glamix',subtitle:'Beleza personalizada'}
];
const QUESTIONS=[
 {title:'Qual intensidade de maquiagem você mais gosta?',options:['Leve e natural','Média, equilibrada','Marcante e expressiva']},
 {title:'Quando você costuma se maquiar?',options:['No dia a dia','Em ocasiões especiais','Um pouco dos dois']},
 {title:'Quais tons mais combinam com seu estilo?',options:['Neutros e terrosos','Rosados e delicados','Quentes e solares','Vibrantes e criativos']},
 {title:'Qual produto não pode faltar na sua nécessaire?',options:['Blush','Produto para lábios','Paleta de sombras','Pincéis e acessórios']},
 {title:'Qual acabamento você prefere?',options:['Matte aveludado','Natural / acetinado','Iluminado / glow']},
 {title:'Quanto tempo você dedica à maquiagem?',options:['Até 5 minutos','Entre 5 e 15 minutos','Mais de 15 minutos']}
];
