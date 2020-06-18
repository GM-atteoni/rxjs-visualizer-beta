class Pizza {

    flavor: string;
    slicesLeft = 8;

    constructor(flavor){
        this.flavor = flavor;
    }

    eatSlice = () => {
        this.slicesLeft -= 1;
    }

}

export default Pizza;