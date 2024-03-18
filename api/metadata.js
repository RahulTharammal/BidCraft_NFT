const sharp = require('sharp');
const { faker } = require('@faker-js/faker');
const FormData = require('form-data');
const axios = require('axios');

const attributes = {
  weapon: ['Stick', 'Knife', 'Blade', 'Club', 'Ax', 'Sword', 'Spear', 'Halberd'],
  environment: ['Space', 'Sky', 'Deserts', 'Forests', 'Grasslands', 'Mountains', 'Oceans', 'Rainforests'],
  rarity: Array.from(Array(6).keys()),
};

const toMetadata = ({ id, name, description, price, image }) => ({
  id,
  name,
  description,
  price,
  image,
  demand: faker.random.numeric({ min: 10, max: 100 }),
  attributes: [
    {
      trait_type: 'Environment',
      value: attributes.environment.sort(() => 0.5 - Math.random())[0],
    },
    {
      trait_type: 'Weapon',
      value: attributes.weapon.sort(() => 0.5 - Math.random())[0],
    },
    {
      trait_type: 'Rarity',
      value: attributes.rarity.sort(() => 0.5 - Math.random())[0],
    },
    {
      display_type: 'date',
      trait_type: 'Created',
      value: Date.now(),
    },
    {
      display_type: 'number',
      trait_type: 'generation',
      value: 1,
    },
  ],
});

const toWebp = async (image) => await sharp(image).resize(500).webp().toBuffer();

const uploadToPinata = async (data) => {
  const form = new FormData();
  form.append('file', data, { filename: 'image.webp' });

  const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`,
      'pinata_api_key': '7db7d65717d604a887a5',
      'pinata_secret_api_key': '72db739c6da6dad74c213adb2e9b2987a8034ec575c13ad58db065373de8f0c4',
    },
  });

  return `https://ipfs.io/ipfs/${response.data.IpfsHash}`;
};

exports.toWebp = toWebp;
exports.toMetadata = toMetadata;
exports.uploadToIPFS = uploadToPinata;
