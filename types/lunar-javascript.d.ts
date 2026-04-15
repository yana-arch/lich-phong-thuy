declare module 'lunar-javascript' {
  export class Solar {
    static fromDate(date: Date): Solar;
    getLunar(): Lunar;
  }

  export class NineStar {
    getNumber(): string;
    getNameInTaiYi(): string;
    getColor(): string;
  }

  export class LunarTime {
    getGanZhi(): string;
    getZhi(): string;
    getMinHm(): string;
    getMaxHm(): string;
    getTianShen(): string;
    getTianShenType(): string;
  }

  export class Lunar {
    getDay(): number;
    getMonth(): number;
    getYear(): number;
    getYearInGanZhi(): string;
    getMonthInGanZhi(): string;
    getDayInGanZhi(): string;
    getTimeInGanZhi(): string;
    getYearShengXiao(): string;
    getMonthShengXiao(): string;
    getDayShengXiao(): string;
    getTimeShengXiao(): string;
    getJieQi(): string;
    getDayPositionXiDesc(): string;
    getDayPositionCaiDesc(): string;
    getDayPositionFuDesc(): string;
    getDayNineStar(): NineStar;
    getYearNineStar(): NineStar;
    getMonthNineStar(): NineStar;
    getTimes(): LunarTime[];
    getDayChongDesc(): string;
    getDayChongShengXiao(): string;
    getZhiXing(): string;
    getXiu(): string;
    getYueXiang(): string;
    getDayYi(): string[];
    getDayJi(): string[];
  }
}
