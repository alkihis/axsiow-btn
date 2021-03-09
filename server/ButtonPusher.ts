import * as path from 'path';
import fs from 'fs';

interface ButtonPush {
  type: string;
  createdAt: string;
}

interface ButtonPushSaver {
  count: number;
  comments: { [pushId: string]: ButtonPush };
  pushIds: string[];
}

const BUTTON_PATH = path.resolve(__dirname, '..', '__button.json');

export class ButtonPusher {
  items: ButtonPushSaver;

  protected constructor(save: ButtonPushSaver) {
    this.items = save;
  }

  pushTheButton(uuid: string) {
    this.items.pushIds.push(uuid);
    this.items.count++;
    this.save();
  }

  addComment(id: string, comment: ButtonPush) {
    if (id in this.items.comments) {
      return false;
    }

    this.items.comments[id] = comment;
    this.save();

    return true;
  }

  pushExists(id: string) {
    return this.items.pushIds.includes(id);
  }

  save() {
    return fs.promises.writeFile(BUTTON_PATH, JSON.stringify(this.items));
  }

  static load() {
    let file = JSON.parse(fs.readFileSync(BUTTON_PATH, 'utf-8'));
    if (typeof file.pushIds[0] === 'number') {
      // Old type
      file = this.convertOldFile(file);
    }

    return new this(file);
  }

  static convertOldFile(file: any) {
    const newFormat: ButtonPushSaver = {
      count: file.count,
      comments: {},
      pushIds: file.pushIds.map(String),
    };

    for (const itemId in file.comments) {
      newFormat.comments[itemId] = {
        type: file.comments[itemId],
        createdAt: new Date().toISOString(),
      };
    }

    return newFormat;
  }
}

export default ButtonPusher.load();
