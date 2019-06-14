export class Profile {
    constructor(
        public family_name:string= "",
        public given_name:string= "",
        public locale:string= "",
        public name:string="",

        public nickname:string= "",
        public picture:string= "https://cdn0.iconfinder.com/data/icons/feather/96/no-512.png",
        public sub:string= "",
        public updated_at:string= ""
    ){}
}
