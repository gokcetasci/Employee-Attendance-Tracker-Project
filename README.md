# Employee Attendance Tracker Project

Bu proje, bir şirkette yöneticilerin ve müdürlerin çalışanlarının yoklamasını alabilmesi ve yönetebilmesi için tasarlanmıştır. 

## Live Preview

You can access the live preview of the project [here.](https://staff-roll-call-1k48.vercel.app)

## Project Note

Bu proje, Next.js kullanılarak geliştirilmiştir. Herhangi bir api değilde zustand ile fake data yönetimi yapılması istendiği için projede bu şekilde ilerlenmiştir. 

Bu bir staj projesidir. Daha sonra projeye entegre edilecektir. O nedenle burada sadece yoklama alma işlevine odaklanılmıştır. 

## Özellikler

* Admin ve yönetici rolleri
* Adminler için bir slider butonla default olarak gelen sadece bugün için yoklama değeri alınabilir seçimini değiştirebilme seçeneği
* Çalışan ara kısmı ile bütün çalışanlar içinde arama yapabilme imkanı 
* Tarih seçip dilenilen tarihteki yoklama değeri görüntüleme imkanı 
* Checkbox ile toplu yoklama alma seçeneği
* Fake data kullanımı (Zustand ile)
* Tailwind CSS kullanılarak stilizasyon

## Project Overview

- **Admins:**
    - Adminler bütün çalışanları görüntüleyebilir. Hepsinin yoklamasını alabilir, düzenleyebilir.
    - Projede default olarak sadece olduğumuz gün için yoklama alınabiliyor ama adminler isterlerse bir slider buton yardımıyla gelecek ve geçmişe dair işlem yapılabilmesini de yönetebilirler.

- **Managers:**
    - Yöneticiler sadece kendi çalışanlarının yoklamalarını görüntüleyebilir, yoklamasını alabilir ve düzenleyebilirler.

- **Employees:**
    - Çalışan sayfalarında yalnızca bir çalışanın aylık yoklama değerleri gösterilir. Bu sayfada herhangi bir işlem yapılamaz. 

# Packages Used and Versions

- **bootstrap**: ^5.3.3,
- **formik**: ^2.4.5,
- **next**: 14.1.3,
- **react**: ^18,
- **react-datepicker**: ^6.6.0,
- **react-dom**: ^18,
- **react-icons**: ^5.0.1,
- **react-scheduler**: ^0.1.0,
- **react-toastify**: ^10.0.5,
- **react-tooltip**: ^5.26.3,
- **yup**: ^1.4.0,
- **zustand**: ^4.5.2

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


