import { renameSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const imagesDir = join(dirname(fileURLToPath(import.meta.url)), "../images");

/** old filename → new canonical filename */
const RENAME_MAP = {
  "pandit raghu ram ji.jpeg": "maha-pandit-raghunath-ji.jpeg",
  "aryan.jpeg": "aryan.jpeg",
  "Jayesh, Mini (pair).jpeg": "pair-jayesh-and-mini.jpeg",
  "Jayesh, Mini, Nayasha.jpeg": "group-jayesh-mini-naisha.jpeg",
  "Nayasha.jpeg": "naisha.jpeg",
  "javesh.jpeg": "javesh.jpeg",
  "trisha.jpeg": "trisha.jpeg",
  "avishi.jpeg": "avishi.jpeg",
  "bhav sharma.jpeg": "bhav-sharma.jpeg",
  "narendra sharma.jpeg": "narendra-sharma.jpeg",
  "parul.jpeg": "parul.jpeg",
  "neha.jpeg": "neha.jpeg",
  "hridesh.jpeg": "hridesh-vyas.jpeg",
  "surabhi.jpeg": "surabhi.jpeg",
  "maya.jpeg": "maya-devi.jpeg",
  "indra vallabh.jpeg": "indra-vallabh.jpeg",
  "abhishek , Rachna, Aryan in centre2.jpeg": "pair-abhishek-and-rachna.jpeg",
  "Anand And nandani (pair).jpeg": "pair-anand-vallabh-and-nandini.jpeg",
  "devki vallabh dwivedi.jpeg": "devki-vallabh.jpeg",
  "mani devi.jpeg": "mani-devi.jpeg",
  "Harshita Dave.jpeg": "harshita-dave.jpeg",
  "Jaya Dave.jpeg": "jaya-dave.jpeg",
  "Ritik Dave.jpeg": "ritik-dave.jpeg",
  "gunvant dwivedi.jpeg": "gunwanth-dwivedi.jpeg",
  "jitendra dave.jpeg": "jitendra-dave.jpeg",
  "Piyul Dwivedi.jpg": "piyul-dwivedi.jpg",
  "pulkit dwivedi.jpeg": "pulkit-dwivedi.jpeg",
  "samridhi.jpg": "samriddhi.jpg",
  "shanti vallabh dwivedi.jpg": "shanti-vallabh.jpg",
  "shashi kala.jpg": "shashikala.jpg",
  "sunita dwivedi.jpeg": "sunita-dwivedi.jpeg",
  "pulkit and samridhi (pair).jpeg": "pair-pulkit-and-samriddhi.jpeg",
};

for (const [oldName, newName] of Object.entries(RENAME_MAP)) {
  const from = join(imagesDir, oldName);
  const to = join(imagesDir, newName);
  if (!existsSync(from)) {
    if (existsSync(to)) {
      console.log("skip (already)", newName);
      continue;
    }
    console.warn("missing:", oldName);
    continue;
  }
  if (from !== to) {
    renameSync(from, to);
    console.log(oldName, "→", newName);
  }
}