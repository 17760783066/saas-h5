let CountryArray = (() => {
  let countries = [
    {
      countryId: 100042,
      value: '86',
      labelEn: 'China',
      label: '中国',
      acronym: 'CN',
    },
    {
      countryId: 100076,
      value: '852',
      labelEn: 'Hongkong',
      label: '中国香港',
      acronym: '810000',
    },
    {
      countryId: 100105,
      value: '853',
      labelEn: 'Macao',
      label: '中国澳门',
      acronym: '820000',
    },
    {
      countryId: 100174,
      value: '886',
      labelEn: 'Taiwan',
      label: '中国台湾',
      acronym: '710000',
    },
    {
      value: '244',
      labelEn: 'Angola',
      label: '安哥拉',
      acronym: 'AO',
    },
    {
      value: '93',
      labelEn: 'Afghanistan',
      label: '阿富汗',
      acronym: 'AF',
    },
    {
      value: '355',
      labelEn: 'Albania',
      label: '阿尔巴尼亚',
      acronym: 'AL',
    },
    {
      value: '213',
      labelEn: 'Algeria',
      label: '阿尔及利亚',
      acronym: 'DZ',
    },
    {
      value: '376',
      labelEn: 'Andorra',
      label: '安道尔共和国',
      acronym: 'AD',
    },
    {
      value: '1264',
      labelEn: 'Anguilla',
      label: '安圭拉岛',
      acronym: 'AI',
    },
    {
      value: '1268',
      labelEn: 'Antigua and Barbuda',
      label: '安提瓜和巴布达',
      acronym: 'AG',
    },
    {
      value: '54',
      labelEn: 'Argentina',
      label: '阿根廷',
      acronym: 'AR',
    },
    {
      value: '374',
      labelEn: 'Armenia',
      label: '亚美尼亚',
      acronym: 'AM',
    },
    {
      value: '61',
      labelEn: 'Australia',
      label: '澳大利亚',
      acronym: 'AU',
    },
    {
      value: '43',
      labelEn: 'Austria',
      label: '奥地利',
      acronym: 'AT',
    },
    {
      countryId: 100018,
      value: '994',
      labelEn: 'Azerbaijan',
      label: '阿塞拜疆',
      acronym: 'AZ',
    },
    {
      countryId: 100019,
      value: '1242',
      labelEn: 'Bahamas',
      label: '巴哈马',
      acronym: 'BS',
    },
    {
      countryId: 100020,
      value: '973',
      labelEn: 'Bahrain',
      label: '巴林',
      acronym: 'BH',
    },
    {
      countryId: 100021,
      value: '880',
      labelEn: 'Bangladesh',
      label: '孟加拉国',
      acronym: 'BD',
    },
    {
      countryId: 100022,
      value: '1246',
      labelEn: 'Barbados',
      label: '巴巴多斯',
      acronym: 'BB',
    },
    {
      countryId: 100023,
      value: '375',
      labelEn: 'Belarus',
      label: '白俄罗斯',
      acronym: 'BY',
    },
    {
      countryId: 100024,
      value: '32',
      labelEn: 'Belgium',
      label: '比利时',
      acronym: 'BE',
    },
    {
      countryId: 100025,
      value: '501',
      labelEn: 'Belize',
      label: '伯利兹',
      acronym: 'BZ',
    },
    {
      countryId: 100026,
      value: '229',
      labelEn: 'Benin',
      label: '贝宁',
      acronym: 'BJ',
    },
    {
      countryId: 100027,
      value: '1441',
      labelEn: 'Bermuda Is.',
      label: '百慕大群岛',
      acronym: 'BM',
    },
    {
      countryId: 100028,
      value: '591',
      labelEn: 'Bolivia',
      label: '玻利维亚',
      acronym: 'BO',
    },
    {
      countryId: 100029,
      value: '267',
      labelEn: 'Botswana',
      label: '博茨瓦纳',
      acronym: 'BW',
    },
    {
      countryId: 100030,
      value: '55',
      labelEn: 'Brazil',
      label: '巴西',
      acronym: 'BR',
    },
    {
      countryId: 100031,
      value: '673',
      labelEn: 'Brunei',
      label: '文莱',
      acronym: 'BN',
    },
    {
      countryId: 100032,
      value: '359',
      labelEn: 'Bulgaria',
      label: '保加利亚',
      acronym: 'BG',
    },
    {
      countryId: 100033,
      value: '226',
      labelEn: 'Burkina-faso',
      label: '布基纳法索',
      acronym: 'BF',
    },
    {
      countryId: 100034,
      value: '95',
      labelEn: 'Burma',
      label: '缅甸',
      acronym: 'MM',
    },
    {
      countryId: 100035,
      value: '257',
      labelEn: 'Burundi',
      label: '布隆迪',
      acronym: 'BI',
    },
    {
      countryId: 100036,
      value: '237',
      labelEn: 'Cameroon',
      label: '喀麦隆',
      acronym: 'CM',
    },
    {
      countryId: 100037,
      value: '001',
      labelEn: 'Canada',
      label: '加拿大',
      acronym: 'CA',
    },
    {
      countryId: 100038,
      value: '1345',
      labelEn: 'Cayman Is.',
      label: '开曼群岛',
      acronym: 'KY',
    },
    {
      countryId: 100039,
      value: '236',
      labelEn: 'Central African Republic',
      label: '中非共和国',
      acronym: 'CF',
    },
    {
      countryId: 100040,
      value: '235',
      labelEn: 'Chad',
      label: '乍得',
      acronym: 'TD',
    },
    {
      countryId: 100041,
      value: '56',
      labelEn: 'Chile',
      label: '智利',
      acronym: 'CL',
    },
    {
      countryId: 100043,
      value: '57',
      labelEn: 'Colombia',
      label: '哥伦比亚',
      acronym: 'CO',
    },
    {
      countryId: 100044,
      value: '242',
      labelEn: 'Congo',
      label: '刚果',
      acronym: 'CG',
    },
    {
      countryId: 100045,
      value: '682',
      labelEn: 'Cook Is.',
      label: '库克群岛',
      acronym: 'CK',
    },
    {
      countryId: 100046,
      value: '506',
      labelEn: 'Costa Rica',
      label: '哥斯达黎加',
      acronym: 'CR',
    },
    {
      countryId: 100047,
      value: '53',
      labelEn: 'Cuba',
      label: '古巴',
      acronym: 'CU',
    },
    {
      countryId: 100048,
      value: '357',
      labelEn: 'Cyprus',
      label: '塞浦路斯',
      acronym: 'CY',
    },
    {
      countryId: 100049,
      value: '420',
      labelEn: 'Czech Republic',
      label: '捷克',
      acronym: 'CZ',
    },
    {
      countryId: 100050,
      value: '45',
      labelEn: 'Denmark',
      label: '丹麦',
      acronym: 'DK',
    },
    {
      countryId: 100051,
      value: '253',
      labelEn: 'Djibouti',
      label: '吉布提',
      acronym: 'DJ',
    },
    {
      countryId: 100052,
      value: '1890',
      labelEn: 'Dominica Rep.',
      label: '多米尼加共和国',
      acronym: 'DO',
    },
    {
      countryId: 100053,
      value: '593',
      labelEn: 'Ecuador',
      label: '厄瓜多尔',
      acronym: 'EC',
    },
    {
      countryId: 100054,
      value: '20',
      labelEn: 'Egypt',
      label: '埃及',
      acronym: 'EG',
    },
    {
      countryId: 100055,
      value: '503',
      labelEn: 'EI Salvador',
      label: '萨尔瓦多',
      acronym: 'SV',
    },
    {
      countryId: 100056,
      value: '372',
      labelEn: 'Estonia',
      label: '爱沙尼亚',
      acronym: 'EE',
    },
    {
      countryId: 100057,
      value: '251',
      labelEn: 'Ethiopia',
      label: '埃塞俄比亚',
      acronym: 'ET',
    },
    {
      countryId: 100058,
      value: '679',
      labelEn: 'Fiji',
      label: '斐济',
      acronym: 'FJ',
    },
    {
      countryId: 100059,
      value: '358',
      labelEn: 'Finland',
      label: '芬兰',
      acronym: 'FI',
    },
    {
      countryId: 100060,
      value: '33',
      labelEn: 'France',
      label: '法国',
      acronym: 'FR',
    },
    {
      countryId: 100061,
      value: '594',
      labelEn: 'French Guiana',
      label: '法属圭亚那',
      acronym: 'GF',
    },
    {
      countryId: 100062,
      value: '241',
      labelEn: 'Gabon',
      label: '加蓬',
      acronym: 'GA',
    },
    {
      countryId: 100063,
      value: '220',
      labelEn: 'Gambia',
      label: '冈比亚',
      acronym: 'GM',
    },
    {
      countryId: 100064,
      value: '995',
      labelEn: 'Georgia',
      label: '格鲁吉亚',
      acronym: 'GE',
    },
    {
      countryId: 100065,
      value: '49',
      labelEn: 'Germany',
      label: '德国',
      acronym: 'DE',
    },
    {
      countryId: 100066,
      value: '233',
      labelEn: 'Ghana',
      label: '加纳',
      acronym: 'GH',
    },
    {
      countryId: 100067,
      value: '350',
      labelEn: 'Gibraltar',
      label: '直布罗陀',
      acronym: 'GI',
    },
    {
      countryId: 100068,
      value: '30',
      labelEn: 'Greece',
      label: '希腊',
      acronym: 'GR',
    },
    {
      countryId: 100070,
      value: '1671',
      labelEn: 'Guam',
      label: '关岛',
      acronym: 'GU',
    },
    {
      countryId: 100071,
      value: '502',
      labelEn: 'Guatemala',
      label: '危地马拉',
      acronym: 'GT',
    },
    {
      countryId: 100072,
      value: '224',
      labelEn: 'Guinea',
      label: '几内亚',
      acronym: 'GN',
    },
    {
      countryId: 100073,
      value: '592',
      labelEn: 'Guyana',
      label: '圭亚那',
      acronym: 'GY',
    },
    {
      countryId: 100074,
      value: '509',
      labelEn: 'Haiti',
      label: '海地',
      acronym: 'HT',
    },
    {
      countryId: 100075,
      value: '504',
      labelEn: 'Honduras',
      label: '洪都拉斯',
      acronym: 'HN',
    },

    {
      countryId: 100077,
      value: '36',
      labelEn: 'Hungary',
      label: '匈牙利',
      acronym: 'HU',
    },
    {
      countryId: 100078,
      value: '354',
      labelEn: 'Iceland',
      label: '冰岛',
      acronym: 'IS',
    },
    {
      countryId: 100079,
      value: '91',
      labelEn: 'India',
      label: '印度',
      acronym: 'IN',
    },
    {
      countryId: 100080,
      value: '62',
      labelEn: 'Indonesia',
      label: '印度尼西亚',
      acronym: 'ID',
    },
    {
      countryId: 100081,
      value: '98',
      labelEn: 'Iran',
      label: '伊朗',
      acronym: 'IR',
    },
    {
      countryId: 100082,
      value: '964',
      labelEn: 'Iraq',
      label: '伊拉克',
      acronym: 'IQ',
    },
    {
      countryId: 100083,
      value: '353',
      labelEn: 'Ireland',
      label: '爱尔兰',
      acronym: 'IE',
    },
    {
      countryId: 100084,
      value: '972',
      labelEn: 'Israel',
      label: '以色列',
      acronym: 'IL',
    },
    {
      countryId: 100085,
      value: '39',
      labelEn: 'Italy',
      label: '意大利',
      acronym: 'IT',
    },
    {
      countryId: 100086,
      value: '225',
      labelEn: 'Ivory Coast',
      label: '科特迪瓦',
      acronym: 'KT',
    },
    {
      countryId: 100087,
      value: '1876',
      labelEn: 'Jamaica',
      label: '牙买加',
      acronym: 'JM',
    },
    {
      countryId: 100088,
      value: '81',
      labelEn: 'Japan',
      label: '日本',
      acronym: 'JP',
    },
    {
      countryId: 100089,
      value: '962',
      labelEn: 'Jordan',
      label: '约旦',
      acronym: 'JO',
    },
    {
      countryId: 100090,
      value: '855',
      labelEn: 'Kampuchea (Cambodia )',
      label: '柬埔寨',
      acronym: 'KH',
    },
    {
      countryId: 100091,
      value: '327',
      labelEn: 'Kazakstan',
      label: '哈萨克斯坦',
      acronym: 'KZ',
    },
    {
      countryId: 100092,
      value: '254',
      labelEn: 'Kenya',
      label: '肯尼亚',
      acronym: 'KE',
    },
    {
      countryId: 100093,
      value: '82',
      labelEn: 'Korea',
      label: '韩国',
      acronym: 'KR',
    },
    {
      countryId: 100094,
      value: '965',
      labelEn: 'Kuwait',
      label: '科威特',
      acronym: 'KW',
    },
    {
      countryId: 100095,
      value: '331',
      labelEn: 'Kyrgyzstan',
      label: '吉尔吉斯坦',
      acronym: 'KG',
    },
    {
      countryId: 100096,
      value: '856',
      labelEn: 'Laos',
      label: '老挝',
      acronym: 'LA',
    },
    {
      countryId: 100097,
      value: '371',
      labelEn: 'Latvia',
      label: '拉脱维亚',
      acronym: 'LV',
    },
    {
      countryId: 100098,
      value: '961',
      labelEn: 'Lebanon',
      label: '黎巴嫩',
      acronym: 'LB',
    },
    {
      countryId: 100099,
      value: '266',
      labelEn: 'Lesotho',
      label: '莱索托',
      acronym: 'LS',
    },
    {
      countryId: 100100,
      value: '231',
      labelEn: 'Liberia',
      label: '利比里亚',
      acronym: 'LR',
    },
    {
      countryId: 100101,
      value: '218',
      labelEn: 'Libya',
      label: '利比亚',
      acronym: 'LY',
    },
    {
      countryId: 100102,
      value: '423',
      labelEn: 'Liechtenstein',
      label: '列支敦士登',
      acronym: 'LI',
    },
    {
      countryId: 100103,
      value: '370',
      labelEn: 'Lithuania',
      label: '立陶宛',
      acronym: 'LT',
    },
    {
      countryId: 100104,
      value: '352',
      labelEn: 'Luxembourg',
      label: '卢森堡',
      acronym: 'LU',
    },
    {
      countryId: 100106,
      value: '261',
      labelEn: 'Madagascar',
      label: '马达加斯加',
      acronym: 'MG',
    },
    {
      countryId: 100107,
      value: '265',
      labelEn: 'Malawi',
      label: '马拉维',
      acronym: 'MW',
    },
    {
      countryId: 100108,
      value: '60',
      labelEn: 'Malaysia',
      label: '马来西亚',
      acronym: 'MY',
    },
    {
      countryId: 100109,
      value: '960',
      labelEn: 'Maldives',
      label: '马尔代夫',
      acronym: 'MV',
    },
    {
      countryId: 100110,
      value: '223',
      labelEn: 'Mali',
      label: '马里',
      acronym: 'ML',
    },
    {
      countryId: 100111,
      value: '356',
      labelEn: 'Malta',
      label: '马耳他',
      acronym: 'MT',
    },
    {
      countryId: 100113,
      value: '596',
      labelEn: 'Martinique',
      label: '马提尼克',
      acronym: 'MQ',
    },
    {
      countryId: 100114,
      value: '230',
      labelEn: 'Mauritius',
      label: '毛里求斯',
      acronym: 'MU',
    },
    {
      countryId: 100115,
      value: '52',
      labelEn: 'Mexico',
      label: '墨西哥',
      acronym: 'MX',
    },
    {
      countryId: 100116,
      value: '373',
      labelEn: 'Moldova, Republic of',
      label: '摩尔多瓦',
      acronym: 'MD',
    },
    {
      countryId: 100117,
      value: '377',
      labelEn: 'Monaco',
      label: '摩纳哥',
      acronym: 'MC',
    },
    {
      countryId: 100118,
      value: '976',
      labelEn: 'Mongolia',
      label: '蒙古',
      acronym: 'MN',
    },
    {
      countryId: 100119,
      value: '1664',
      labelEn: 'Montserrat Is',
      label: '蒙特塞拉特岛',
      acronym: 'MS',
    },
    {
      countryId: 100120,
      value: '212',
      labelEn: 'Morocco',
      label: '摩洛哥',
      acronym: 'MA',
    },
    {
      countryId: 100121,
      value: '258',
      labelEn: 'Mozambique',
      label: '莫桑比克',
      acronym: 'MZ',
    },
    {
      countryId: 100122,
      value: '264',
      labelEn: 'Namibia',
      label: '纳米比亚',
      acronym: 'NA',
    },
    {
      countryId: 100123,
      value: '674',
      labelEn: 'Nauru',
      label: '瑙鲁',
      acronym: 'NR',
    },
    {
      countryId: 100124,
      value: '977',
      labelEn: 'Nepal',
      label: '尼泊尔',
      acronym: 'NP',
    },
    {
      countryId: 100126,
      value: '31',
      labelEn: 'Netherlands',
      label: '荷兰',
      acronym: 'NL',
    },
    {
      countryId: 100127,
      value: '64',
      labelEn: 'New Zealand',
      label: '新西兰',
      acronym: 'NZ',
    },
    {
      countryId: 100128,
      value: '505',
      labelEn: 'Nicaragua',
      label: '尼加拉瓜',
      acronym: 'NI',
    },
    {
      countryId: 100129,
      value: '227',
      labelEn: 'Niger',
      label: '尼日尔',
      acronym: 'NE',
    },
    {
      countryId: 100130,
      value: '234',
      labelEn: 'Nigeria',
      label: '尼日利亚',
      acronym: 'NG',
    },
    {
      countryId: 100131,
      value: '850',
      labelEn: 'North Korea',
      label: '朝鲜',
      acronym: 'KP',
    },
    {
      countryId: 100132,
      value: '47',
      labelEn: 'Norway',
      label: '挪威',
      acronym: 'NO',
    },
    {
      countryId: 100133,
      value: '968',
      labelEn: 'Oman',
      label: '阿曼',
      acronym: 'OM',
    },
    {
      countryId: 100134,
      value: '92',
      labelEn: 'Pakistan',
      label: '巴基斯坦',
      acronym: 'PK',
    },
    {
      countryId: 100135,
      value: '507',
      labelEn: 'Panama',
      label: '巴拿马',
      acronym: 'PA',
    },
    {
      countryId: 100136,
      value: '675',
      labelEn: 'Papua New Cuinea',
      label: '巴布亚新几内亚',
      acronym: 'PG',
    },
    {
      countryId: 100137,
      value: '595',
      labelEn: 'Paraguay',
      label: '巴拉圭',
      acronym: 'PY',
    },
    {
      countryId: 100138,
      value: '51',
      labelEn: 'Peru',
      label: '秘鲁',
      acronym: 'PE',
    },
    {
      countryId: 100139,
      value: '63',
      labelEn: 'Philippines',
      label: '菲律宾',
      acronym: 'PH',
    },
    {
      countryId: 100140,
      value: '48',
      labelEn: 'Poland',
      label: '波兰',
      acronym: 'PL',
    },
    {
      countryId: 100141,
      value: '689',
      labelEn: 'French Polynesia',
      label: '法属玻利尼西亚',
      acronym: 'PF',
    },
    {
      countryId: 100142,
      value: '351',
      labelEn: 'Portugal',
      label: '葡萄牙',
      acronym: 'PT',
    },
    {
      countryId: 100143,
      value: '1787',
      labelEn: 'Puerto Rico',
      label: '波多黎各',
      acronym: 'PR',
    },
    {
      countryId: 100144,
      value: '974',
      labelEn: 'Qatar',
      label: '卡塔尔',
      acronym: 'QA',
    },
    {
      countryId: 100145,
      value: '262',
      labelEn: 'Reunion',
      label: '留尼旺',
      acronym: 'RE',
    },
    {
      countryId: 100146,
      value: '40',
      labelEn: 'Romania',
      label: '罗马尼亚',
      acronym: 'RO',
    },
    {
      countryId: 100147,
      value: '7',
      labelEn: 'Russia',
      label: '俄罗斯',
      acronym: 'RU',
    },
    {
      countryId: 100148,
      value: '1758',
      labelEn: 'Saint Lueia',
      label: '圣卢西亚',
      acronym: 'LC',
    },
    {
      countryId: 100151,
      value: '685',
      labelEn: 'Samoa Western',
      label: '西萨摩亚',
      acronym: 'WS',
    },
    {
      countryId: 100152,
      value: '378',
      labelEn: 'San Marino',
      label: '圣马力诺',
      acronym: 'SM',
    },
    {
      countryId: 100153,
      value: '239',
      labelEn: 'Sao Tome and Principe',
      label: '圣多美和普林西比',
      acronym: 'ST',
    },
    {
      countryId: 100154,
      value: '966',
      labelEn: 'Saudi Arabia',
      label: '沙特阿拉伯',
      acronym: 'SA',
    },
    {
      countryId: 100155,
      value: '221',
      labelEn: 'Senegal',
      label: '塞内加尔',
      acronym: 'SN',
    },
    {
      countryId: 100156,
      value: '248',
      labelEn: 'Seychelles',
      label: '塞舌尔',
      acronym: 'SC',
    },
    {
      countryId: 100157,
      value: '232',
      labelEn: 'Sierra Leone',
      label: '塞拉利昂',
      acronym: 'SL',
    },
    {
      countryId: 100158,
      value: '65',
      labelEn: 'Singapore',
      label: '新加坡',
      acronym: 'SG',
    },
    {
      countryId: 100159,
      value: '421',
      labelEn: 'Slovakia',
      label: '斯洛伐克',
      acronym: 'SK',
    },
    {
      countryId: 100160,
      value: '386',
      labelEn: 'Slovenia',
      label: '斯洛文尼亚',
      acronym: 'SI',
    },
    {
      countryId: 100161,
      value: '677',
      labelEn: 'Solomon Is',
      label: '所罗门群岛',
      acronym: 'SB',
    },
    {
      countryId: 100162,
      value: '252',
      labelEn: 'Somali',
      label: '索马里',
      acronym: 'SO',
    },
    {
      countryId: 100163,
      value: '27',
      labelEn: 'South Africa',
      label: '南非',
      acronym: 'ZA',
    },
    {
      countryId: 100164,
      value: '34',
      labelEn: 'Spain',
      label: '西班牙',
      acronym: 'ES',
    },
    {
      countryId: 100165,
      value: '94',
      labelEn: 'Sri Lanka',
      label: '斯里兰卡',
      acronym: 'LK',
    },
    {
      countryId: 100167,
      value: '1784',
      labelEn: 'St.Vincent',
      label: '圣文森特',
      acronym: 'VC',
    },
    {
      countryId: 100168,
      value: '249',
      labelEn: 'Sudan',
      label: '苏丹',
      acronym: 'SD',
    },
    {
      countryId: 100169,
      value: '597',
      labelEn: 'Suriname',
      label: '苏里南',
      acronym: 'SR',
    },
    {
      countryId: 100170,
      value: '268',
      labelEn: 'Swaziland',
      label: '斯威士兰',
      acronym: 'SZ',
    },
    {
      countryId: 100171,
      value: '46',
      labelEn: 'Sweden',
      label: '瑞典',
      acronym: 'SE',
    },
    {
      countryId: 100172,
      value: '41',
      labelEn: 'Switzerland',
      label: '瑞士',
      acronym: 'CH',
    },
    {
      countryId: 100173,
      value: '963',
      labelEn: 'Syria',
      label: '叙利亚',
      acronym: 'SY',
    },
    {
      countryId: 100175,
      value: '992',
      labelEn: 'Tajikstan',
      label: '塔吉克斯坦',
      acronym: 'TJ',
    },
    {
      countryId: 100176,
      value: '255',
      labelEn: 'Tanzania',
      label: '坦桑尼亚',
      acronym: 'TZ',
    },
    {
      countryId: 100177,
      value: '66',
      labelEn: 'Thailand',
      label: '泰国',
      acronym: 'TH',
    },
    {
      countryId: 100178,
      value: '228',
      labelEn: 'Togo',
      label: '多哥',
      acronym: 'TG',
    },
    {
      countryId: 100179,
      value: '676',
      labelEn: 'Tonga',
      label: '汤加',
      acronym: 'TO',
    },
    {
      countryId: 100180,
      value: '1809',
      labelEn: 'Trinidad and Tobago',
      label: '特立尼达和多巴哥',
      acronym: 'TT',
    },
    {
      countryId: 100181,
      value: '216',
      labelEn: 'Tunisia',
      label: '突尼斯',
      acronym: 'TN',
    },
    {
      countryId: 100182,
      value: '90',
      labelEn: 'Turkey',
      label: '土耳其',
      acronym: 'TR',
    },
    {
      countryId: 100183,
      value: '993',
      labelEn: 'Turkmenistan',
      label: '土库曼斯坦',
      acronym: 'TM',
    },
    {
      countryId: 100184,
      value: '256',
      labelEn: 'Uganda',
      label: '乌干达',
      acronym: 'UG',
    },
    {
      countryId: 100185,
      value: '380',
      labelEn: 'Ukraine',
      label: '乌克兰',
      acronym: 'UA',
    },
    {
      countryId: 100186,
      value: '971',
      labelEn: 'United Arab Emirates',
      label: '阿拉伯联合酋长国',
      acronym: 'AE',
    },
    {
      countryId: 100187,
      value: '44',
      labelEn: 'United Kiongdom',
      label: '英国',
      acronym: 'GB',
    },
    {
      countryId: 100188,
      value: '1',
      labelEn: 'United States of America',
      label: '美国',
      acronym: 'US',
    },
    {
      countryId: 100189,
      value: '598',
      labelEn: 'Uruguay',
      label: '乌拉圭',
      acronym: 'UY',
    },
    {
      countryId: 100190,
      value: '998',
      labelEn: 'Uzbekistan',
      label: '乌兹别克斯坦',
      acronym: 'UZ',
    },
    {
      countryId: 100191,
      value: '58',
      labelEn: 'Venezuela',
      label: '委内瑞拉',
      acronym: 'VE',
    },
    {
      countryId: 100192,
      value: '84',
      labelEn: 'Vietnam',
      label: '越南',
      acronym: 'VN',
    },
    {
      countryId: 100193,
      value: '967',
      labelEn: 'Yemen',
      label: '也门',
      acronym: 'YE',
    },
    {
      countryId: 100194,
      value: '381',
      labelEn: 'Yugoslavia',
      label: '南斯拉夫',
      acronym: 'YU',
    },
    {
      countryId: 100195,
      value: '263',
      labelEn: 'Zimbabwe',
      label: '津巴布韦',
      acronym: 'ZW',
    },
    {
      countryId: 100196,
      value: '243',
      labelEn: 'Zaire',
      label: '扎伊尔',
      acronym: 'ZR',
    },
    {
      countryId: 100197,
      value: '260',
      labelEn: 'Zambia',
      label: '赞比亚',
      acronym: 'ZM',
    },
  ];
  
  return {
    countries
  };
})();

export default CountryArray;
