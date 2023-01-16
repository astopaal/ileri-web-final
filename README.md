### Bu web uygulaması; Vite, React, Nodejs, TailwindCss, PostgreSql ile XLSX kütüphanesi kullanarak excel işlemlerini yapar.

Çalıştırmak için server klasörüne gidip `node index.js` çalıştırın. 
Ardından bir üst dizinde `npm run dev` komutu ile react projesini de çalıştırın.

Kullanıcıdan bir xls veys xlsx türünde dosya yüklemesi beklenir. Farklı türlerdeki yüklemelere izin verilmez. Çıkan uyarıyla bu dosyadaki öğrenciler veri tabanına kaydedilebilir.
Ardından select componentinden seçilen sınıfların kontenjanı yeterli iste karıştır butonu ile öğrenciler karıştırılır ve sınıflara dağıtılır.

Alttaki butonlarla karıştırılmış sınıflar modal içinde görüntülenebilir ve excel çıktısı alınabilir.

Öğrenci numarasına göre arama yapılabilir ve sınav giriş kartı oluşturulabilir.
