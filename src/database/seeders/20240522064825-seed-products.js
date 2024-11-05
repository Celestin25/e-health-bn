"use strict";

const { v4: uuidv4 } = require("uuid");

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
    `);

    const pharmacyProducts = [
      {
        name: "Paracetamol 500mg",
        description:
          "Pain reliever and fever reducer. Take as directed by your healthcare provider.",
        category: "Over-the-Counter Medicine",
        price: 5000,
        images: [medicineImage, medicineImage, medicineImage, medicineImage],
      },
      {
        name: "Vitamin C 1000mg",
        description:
          "Support your immune system with daily Vitamin C supplement. Contains 30 tablets.",
        category: "Vitamins & Supplements",
        price: 15000,
        images: [vitaminsImage, vitaminsImage, vitaminsImage, vitaminsImage],
      },
      {
        name: "First Aid Kit Basic",
        description:
          "Essential first aid supplies including bandages, gauze, antiseptic wipes, and medical tape.",
        category: "Medical Supplies",
        price: 45000,
        images: [firstAidImage, firstAidImage, firstAidImage, firstAidImage],
      },
      {
        name: "Ibuprofen 400mg",
        description:
          "Anti-inflammatory pain relief medication. Use as directed.",
        category: "Over-the-Counter Medicine",
        price: 8000,
        images: [medicineImage, medicineImage, medicineImage, medicineImage],
      },
      {
        name: "Multivitamin Daily",
        description:
          "Complete daily vitamins and minerals for overall health support.",
        category: "Vitamins & Supplements",
        price: 25000,
        images: [vitaminsImage, vitaminsImage, vitaminsImage, vitaminsImage],
      },
      {
        name: "Hand Sanitizer 500ml",
        description:
          "Alcohol-based sanitizer that kills 99.9% of germs. Perfect for on-the-go use.",
        category: "Personal Care",
        price: 7000,
        images: [
          personalCareImage,
          personalCareImage,
          personalCareImage,
          personalCareImage,
        ],
      },
    ];

    const products = vendors.flatMap((vendor) =>
      pharmacyProducts.map((product) => ({
        productId: uuidv4(),
        vendorId: vendor.vendorId,
        name: product.name,
        image: JSON.stringify(product.images),
        description: product.description,
        discount: Math.floor(Math.random() * 10), // Random discount between 0-10%
        price: product.price,
        quantity: 50 + Math.floor(Math.random() * 50), // Random quantity between 50-100
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
    // @ts-ignore
    await queryInterface.bulkDelete("Products", null, {});
  },
};
