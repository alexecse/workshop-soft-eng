export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items: Array<Item> = []) {
        this.items = items;
    }

    updateQuality() {
        for (let item of this.items) {
            this.updateForItem(item);
        }
        return this.items;
    }

    private updateForItem(item: Item) {
        switch (item.name) {
            case 'Aged Brie':
                this.updateAgedBrie(item);
                break;
            case 'Backstage passes to a TAFKAL80ETC concert':
                this.updateBackstagePass(item);
                break;
            case 'Sulfuras, Hand of Ragnaros':
                this.updateSulfuras(item);
                break;
            default:
                this.updateStandardItem(item);
                break;
        }
    }

    private updateAgedBrie(item: Item) {
        this.increaseQuality(item);
        item.sellIn -= 1;

        if (item.sellIn < 0) {
            this.increaseQuality(item);
        }
    }

    private updateBackstagePass(item: Item) {
        this.increaseQuality(item);

        if (item.sellIn <= 10) this.increaseQuality(item);
        if (item.sellIn <= 5) this.increaseQuality(item);

        item.sellIn -= 1;

        if (item.sellIn < 0) {
            item.quality = 0;
        }
    }

    private updateSulfuras(item: Item) {
        // Sulfuras quality and sellIn do not change
    }

    private updateStandardItem(item: Item) {
        this.decreaseQuality(item);
        item.sellIn -= 1;

        if (item.sellIn < 0) {
            this.decreaseQuality(item);
        }
    }

    private increaseQuality(item: Item) {
        if (item.quality < 50) {
            item.quality += 1;
        }
    }

    private decreaseQuality(item: Item) {
        if (item.quality > 0) {
            item.quality -= 1;
        }
    }
}
