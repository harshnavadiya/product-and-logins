export class ProductList {
    constructor(
        public _id:string|number='',
        public sku:number,
        public name:string='',
        public type:string='',
        public price:number,
        public category:any,
        public shipping:number,
        public description:string='',
        public manufacturer:string='',
        public model:string='',
        public url:string='',
        public image:string=''

    ){}


}
