## Migration

To create Migration use

```sh
npm run migration:generate --name=...
```

After generating, run migration

```sh
npm run migration:run
```

Revert migration is used to undo the migration. The file has to be deleted manually

```sh
npm run migration:revert
```
