import { NTag } from 'naive-ui';
import type { TableColumns } from 'naive-ui/es/data-table/src/interface';
import type { JSX } from 'vue/jsx-runtime';
import { useRouter } from 'vue-router';

export function columns(): TableColumns<any> {
  const router = useRouter();

  const routerPush = (row: any) => {
    router.push({ path: '/generator-code', query: { tableName: row.tableName } }).then();
  };

  return [
    {
      title: '序号',
      key: 'no',
      titleAlign: 'center',
      align: 'center',
      render(row, index): JSX.Element {
        return index + 1;
      },
    },
    {
      title: '数据库名称',
      key: 'tableCat',
      titleAlign: 'center',
      align: 'center',
      render(row): JSX.Element {
        return <NTag type="primary">{row.tableCat}</NTag>;
      },
    },
    {
      title: '表类型',
      key: 'tableType',
      titleAlign: 'center',
      align: 'center',
      render(row): JSX.Element {
        return <NTag>{row.tableType}</NTag>;
      },
    },
    {
      title: '表名',
      key: 'tableName',
      titleAlign: 'center',
      align: 'center',
      render(row): JSX.Element {
        return (
          <NTag type="info">
            <a href="javascript:" onClick={() => routerPush(row)}>
              {row.tableName}
            </a>
          </NTag>
        );
      },
    },
    {
      title: '注释内容',
      key: 'comment',
      titleAlign: 'center',
      align: 'center',
      render(row): JSX.Element {
        return (
          <NTag type="info">
            <a href="javascript:" onClick={() => routerPush(row)}>
              {row.comment}
            </a>
          </NTag>
        );
      },
    },
  ];
}
