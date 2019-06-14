export class Common {
    public static base_url="http://localhost:3001";
    public static isDev=true;
    public static user_id=localStorage.getItem('user_id');
 //class method
 static Dlog(object: any) {
    if (Common.isDev) {
        console.log(object);
    }
}
}
