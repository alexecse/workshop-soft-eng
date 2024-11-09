import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
    it('should foo', () => {
        // Arrange
        const gildedRose = new GildedRose([new Item('foo', 0, 0)]);

        // Act
        const items = gildedRose.updateQuality();

        // Assert
        expect(items[0].name).toBe('foo');
    });

    it('sword quality drops by 1', () => {
      // Arrange
      const gildedRose = new GildedRose([new Item('Sword', 1, 1)]);

      // Act
      const items = gildedRose.updateQuality();

      // Assert
      expect(items[0].quality).toBe(0);
    })

    it('SellIn decrements normally for normal products', () => {
      const gildedRose = new GildedRose([new Item('NormalProduct', 10, 14)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
    })

    it('SellIn and Quality decrement daily, for one', () => {
      const gildedRose = new GildedRose([new Item('NotSoWantedProduct', 4, 9)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(3);
      expect(items[0].quality).toBe(8);
    })

    it('SellIn and Quality decrement daily, for all', () => {
      const gildedRose = new GildedRose([
        new Item('Apple', 5, 10),
        new Item('Banana', 5, 10),
        new Item('Thing', 5, 10),
        new Item('Aha', 5, 10),
        new Item('Not_a_thing', 5, 10),
        new Item('Bine', 5, 10),
        new Item('Matei_Stanuca', 5, 10),

      ]);
      const items = gildedRose.updateQuality();
      items.forEach((item) => {
        expect(item.sellIn).toBe(4);
        expect(item.quality).toBe(9);
      });
    })

    it('Backstage with SellIn lesser than 11, increment quality + 2', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 8, 10)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(12);
    })

    it('Backstage with SellIn lesser than 6, increment quality + 3', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', 4, 10)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(13);
    })

    it('Negative SellIn and Backstage, Quality becomes 0', () => {
      const gildedRose = new GildedRose([
        new Item('Backstage passes to a TAFKAL80ETC concert', -6, 10)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    })

    it('Negative SellIn and Aged Brie Quality increments up to 50', () => {
      const gildedRose = new GildedRose([
        new Item('Aged Brie', -6, 50)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    })

    it('Sulfuras not degrading', () => {
      const gildedRose = new GildedRose([
        new Item('Sulfuras, Hand of Ragnaros', -6, 15)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(15);
    })

    it('Normal degrading', () => {
      const gildedRose = new GildedRose([
        new Item('MIauMiau', -6, 15)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(13);
    })

    it('Normal degrading 2', () => {
      const gildedRose = new GildedRose([
        new Item('MIauMiau', 6, 15)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(14);
    })
});
