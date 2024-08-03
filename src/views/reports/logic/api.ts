import axios from "axios";
import { Feat } from "../../../interfaces/feats";
const siteHost: string  = process.env.REACT_APP_NODE_MODE === 'development' ?
    `http://localhost:3001` : `https://nest-typeorm.herokuapp.com`;

export const getOptions = async (link: string) => {
    const allCharacters = await axios
      .get(`${siteHost}${link}`)
      .catch((err) => {
        throw new Error(err.message);
      });
      const a = allCharacters?.data as Feat[];
      return a.map( f => {
        return {
            val: f.id,
            txt: f.desc.name,
        }
      })
  };