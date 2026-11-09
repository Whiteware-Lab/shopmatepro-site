# ShopmatePro · sito pubblico

Pagina di presentazione, download e feed degli aggiornamenti su
[GitHub Pages](https://whiteware-lab.github.io/shopmatepro-site/).
L'app è nel repository privato `Whiteware-Lab/ShopmatePro`.

Per pubblicare una build, crea una release stabile con tag
`vVERSIONE-build.NUMERO` e allega questi file della stessa build.

- `ShopmatePro-Android.apk`, firmato con la chiave di distribuzione
- `ShopmatePro-Setup.exe`, installer del launcher Windows
- `SHA256SUMS.txt`, checksum dei due pacchetti

Imposta la release come ultima solo dopo aver preparato e verificato tutti gli
asset. GitHub Actions inserisce nella pagina i download di quella release e
pubblica `latest-build.txt` nello stesso deploy. Le app installate leggono
questo file e confrontano il numero con la propria build.

Per aggiornare il sito, modifica i file in `dist/`. Le modifiche a `main`
attivano un nuovo deploy. Gli installer rimangono allegati alle release.
