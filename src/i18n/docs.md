# 添加翻译

-  在翻译平台: http://transify.xxx.com/resources/572

  添加字段后， 需要执行：

  `yarn i18n` 下载到本地。

# 新语言支持

- 需要在 compoments/Local.js 中配置新的语言，注册等。

# 翻译的用法：

```js
import { useTranslate } from '@/hooks/useTranslate';

// inside your function compinents:
const translate = useTranslate();

translate('transify_id');

or;

translate('transify_id', { params });
```
