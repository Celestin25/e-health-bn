"use strict";

const { v4: uuidv4 } = require("uuid");

interface Vendor {
  vendorId: string;
}

interface PharmacyProduct {
  name: string;
  description: string;
  category: string;
  price: number;
  images: string[];
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const medicineImage =
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3";
    const vitaminsImage =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS2-BfgTg4ZodrI9OssyQJ6uVLFHg5ZxByHw&s";
    const firstAidImage =
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-4.0.3";
    const personalCareImage =
      "https://target.scene7.com/is/image/Target/GUEST_c9680030-cb16-48a3-ab5b-7332845bf110?wid=488&hei=488&fmt=pjpeg";

    const [vendors] = await queryInterface.sequelize.query(`
      SELECT "vendorId" 
      FROM "Vendors" 
      ORDER BY "createdAt" DESC 
      LIMIT 3;
    `) as [Vendor[], unknown];

    const pharmacyProducts: PharmacyProduct[] = [
      {
        name: "Paracetamol 500mg",
        description:
          "Pain reliever and fever reducer. Take as directed by your healthcare provider.",
        category: "Over-the-Counter Medicine",
        price: 5000,
        images: [medicineImage, medicineImage, medicineImage, medicineImage],
      },
      // ... rest of your products array
    ];

    const products = vendors.flatMap((vendor: Vendor) =>
      pharmacyProducts.map((product) => ({
        productId: uuidv4(),
        vendorId: vendor.vendorId,
        name: product.name,
        image: JSON.stringify(product.images),
        description: product.description,
        discount: Math.floor(Math.random() * 10),
        price: product.price,
        quantity: 50 + Math.floor(Math.random() * 50),
        category: product.category,
        createdAt: new Date(),
        updatedAt: new Date(),
        expired: false,
        available: true,
      }))
    );

    await queryInterface.bulkInsert("Products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};