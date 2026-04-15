export type Gender = 'male' | 'female';

export interface CungMenh {
  cung: string;
  hanh: string;
  huongTot: { huong: string; ten: string; yNghia: string }[];
  huongXau: { huong: string; ten: string; yNghia: string }[];
}

const CUNG_DATA: Record<number, { cung: string; hanh: string }> = {
  1: { cung: 'Khảm', hanh: 'Thủy' },
  2: { cung: 'Khôn', hanh: 'Thổ' },
  3: { cung: 'Chấn', hanh: 'Mộc' },
  4: { cung: 'Tốn', hanh: 'Mộc' },
  5: { cung: 'Trung Cung', hanh: 'Thổ' }, // Special case handled in logic
  6: { cung: 'Càn', hanh: 'Kim' },
  7: { cung: 'Đoài', hanh: 'Kim' },
  8: { cung: 'Cấn', hanh: 'Thổ' },
  9: { cung: 'Ly', hanh: 'Hỏa' },
};

const HUONG_BAT_TRACH: Record<string, Record<string, string>> = {
  'Càn': {
    'Tây Bắc': 'Phục Vị',
    'Đông Bắc': 'Thiên Y',
    'Tây': 'Sinh Khí',
    'Tây Nam': 'Diên Niên',
    'Bắc': 'Lục Sát',
    'Đông': 'Ngũ Quỷ',
    'Đông Nam': 'Họa Hại',
    'Nam': 'Tuyệt Mệnh',
  },
  'Khảm': {
    'Bắc': 'Phục Vị',
    'Đông': 'Thiên Y',
    'Đông Nam': 'Sinh Khí',
    'Nam': 'Diên Niên',
    'Tây Bắc': 'Lục Sát',
    'Đông Bắc': 'Ngũ Quỷ',
    'Tây': 'Họa Hại',
    'Tây Nam': 'Tuyệt Mệnh',
  },
  'Cấn': {
    'Đông Bắc': 'Phục Vị',
    'Tây Bắc': 'Thiên Y',
    'Tây Nam': 'Sinh Khí',
    'Tây': 'Diên Niên',
    'Đông': 'Lục Sát',
    'Bắc': 'Ngũ Quỷ',
    'Nam': 'Họa Hại',
    'Đông Nam': 'Tuyệt Mệnh',
  },
  'Chấn': {
    'Đông': 'Phục Vị',
    'Bắc': 'Thiên Y',
    'Nam': 'Sinh Khí',
    'Đông Nam': 'Diên Niên',
    'Đông Bắc': 'Lục Sát',
    'Tây Bắc': 'Ngũ Quỷ',
    'Tây Nam': 'Họa Hại',
    'Tây': 'Tuyệt Mệnh',
  },
  'Tốn': {
    'Đông Nam': 'Phục Vị',
    'Nam': 'Thiên Y',
    'Bắc': 'Sinh Khí',
    'Đông': 'Diên Niên',
    'Tây': 'Lục Sát',
    'Tây Nam': 'Ngũ Quỷ',
    'Tây Bắc': 'Họa Hại',
    'Đông Bắc': 'Tuyệt Mệnh',
  },
  'Ly': {
    'Nam': 'Phục Vị',
    'Đông Nam': 'Thiên Y',
    'Đông': 'Sinh Khí',
    'Bắc': 'Diên Niên',
    'Tây Nam': 'Lục Sát',
    'Tây': 'Ngũ Quỷ',
    'Đông Bắc': 'Họa Hại',
    'Tây Bắc': 'Tuyệt Mệnh',
  },
  'Khôn': {
    'Tây Nam': 'Phục Vị',
    'Tây': 'Thiên Y',
    'Đông Bắc': 'Sinh Khí',
    'Tây Bắc': 'Diên Niên',
    'Nam': 'Lục Sát',
    'Đông Nam': 'Ngũ Quỷ',
    'Đông': 'Họa Hại',
    'Bắc': 'Tuyệt Mệnh',
  },
  'Đoài': {
    'Tây': 'Phục Vị',
    'Tây Nam': 'Thiên Y',
    'Tây Bắc': 'Sinh Khí',
    'Đông Bắc': 'Diên Niên',
    'Đông Nam': 'Lục Sát',
    'Nam': 'Ngũ Quỷ',
    'Bắc': 'Họa Hại',
    'Đông': 'Tuyệt Mệnh',
  },
};

const Y_NGHIA_HUONG: Record<string, string> = {
  'Sinh Khí': 'Thu hút tài lộc, danh tiếng, thăng quan phát tài.',
  'Thiên Y': 'Cải thiện sức khỏe, trường thọ.',
  'Diên Niên': 'Củng cố các mối quan hệ trong gia đình, tình yêu.',
  'Phục Vị': 'Củng cố sức mạnh tinh thần, mang lại tiến bộ của bản thân, may mắn trong thi cử.',
  'Họa Hại': 'Không may mắn, thị phi, thất bại.',
  'Ngũ Quỷ': 'Mất nguồn thu nhập, mất việc làm, cãi vã.',
  'Lục Sát': 'Xáo trộn trong quan hệ tình cảm, thù hận, kiện tụng, tai nạn.',
  'Tuyệt Mệnh': 'Phá sản, bệnh tật chết người.',
};

export function calculateBatTrach(year: number, gender: Gender): CungMenh | null {
  if (year < 1900 || year > 2100) return null;

  // Calculate sum of digits of the year
  let sum = 0;
  let tempYear = year;
  while (tempYear > 0) {
    sum += tempYear % 10;
    tempYear = Math.floor(tempYear / 10);
  }

  // Reduce to single digit
  while (sum > 9) {
    let newSum = 0;
    while (sum > 0) {
      newSum += sum % 10;
      sum = Math.floor(sum / 10);
    }
    sum = newSum;
  }

  let quaiSo = 0;
  if (gender === 'male') {
    quaiSo = 11 - sum;
    if (quaiSo > 9) quaiSo -= 9;
  } else {
    quaiSo = 4 + sum;
    if (quaiSo > 9) quaiSo -= 9;
  }

  // Handle special case 5
  if (quaiSo === 5) {
    quaiSo = gender === 'male' ? 2 : 8;
  }

  const cungInfo = CUNG_DATA[quaiSo];
  if (!cungInfo) return null;

  const huongCuaCung = HUONG_BAT_TRACH[cungInfo.cung];
  
  const huongTot = [];
  const huongXau = [];

  for (const [huong, ten] of Object.entries(huongCuaCung)) {
    const item = { huong, ten, yNghia: Y_NGHIA_HUONG[ten] };
    if (['Sinh Khí', 'Thiên Y', 'Diên Niên', 'Phục Vị'].includes(ten)) {
      huongTot.push(item);
    } else {
      huongXau.push(item);
    }
  }

  // Sort good and bad directions
  const totOrder = ['Sinh Khí', 'Thiên Y', 'Diên Niên', 'Phục Vị'];
  const xauOrder = ['Tuyệt Mệnh', 'Ngũ Quỷ', 'Lục Sát', 'Họa Hại'];

  huongTot.sort((a, b) => totOrder.indexOf(a.ten) - totOrder.indexOf(b.ten));
  huongXau.sort((a, b) => xauOrder.indexOf(a.ten) - xauOrder.indexOf(b.ten));

  return {
    cung: cungInfo.cung,
    hanh: cungInfo.hanh,
    huongTot,
    huongXau,
  };
}
