class Pizza {

    flavor: string;
    slicesLeft = 8;
    img: string
    imgBig: string;
    juice: string;

    constructor(flavor, img, imgBig){
        this.flavor = flavor;
        this.img = img;
        this.imgBig = imgBig;
    }

    eatSlice = () => {
        this.slicesLeft -= 1;
    }

}

export default Pizza;