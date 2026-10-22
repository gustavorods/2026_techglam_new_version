const fs=require('fs');
const path=require('path');
const vm=require('vm');
const assert=require('assert');

const root=path.resolve(__dirname,'..');
const context={encodeURI};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'assets/real-images.js'),'utf8')+'\n'+fs.readFileSync(path.join(root,'data.js'),'utf8')+'\nglobalThis.CATALOG=PRODUCTS',context);

const products=context.CATALOG;
assert.strictEqual(products.length,11);
assert.deepStrictEqual(Array.from(products.find(p=>p.id==='lip-gloss').variants,v=>v.name),['Rosa Cristal','Pink Intenso','Cereja Suave','Ameixa Suave','Chocolate Mauve','Vinho Elegante']);
assert.deepStrictEqual(Array.from(products.find(p=>p.id==='lip-oil-fruits').variants,v=>v.name),['Melancia','Mirtilo','Morango','Pêssego','Cereja']);

let count=0;
for(const product of products){
  const groups=product.variants.length?product.variants.map(v=>v.images):[product.images];
  for(const images of groups){
    assert(images.length>0,`${product.id} sem foto`);
    for(const image of images){
      const file=path.join(root,decodeURI(image.src).replace(/^\.\//,''));
      assert(fs.existsSync(file),`Foto ausente: ${file}`);
      assert(image.alt&&!/mockup|ilustrativ/i.test(image.alt),`Texto alternativo incorreto: ${image.alt}`);
      count++;
    }
  }
}
console.log(`${count} fotos do catálogo e variantes: PASS`);
