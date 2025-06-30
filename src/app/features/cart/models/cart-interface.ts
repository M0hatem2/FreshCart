export interface cart {
     status: string
     numOfCartItems: number
     cartId: string
     data: Data
     
}

export interface Data {
     cartOwner: string
     products: Product[]
     createdAt: string
     updatedAt: string
     totalCartPrice: number
}

export interface Product {
     _id: string
     count: number
     product: Product2
     price: number
}

export interface Product2 {
     subcategory: Subcategory[]
     title: string
     _id: string

     quantity: number
     imageCover: string
     category: Category
     brand: Brand
     ratingsAverage: number
     id: string
}

export interface Subcategory {
     name: string
     slug: string
     category: string
}

export interface Category {
     name: string
     slug: string
     image: string
}

export interface Brand {
     name: string
     slug: string
     image: string
}
