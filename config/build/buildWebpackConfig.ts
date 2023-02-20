import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/config';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options;
    return {
        // MODE - ВЫБИРАЕМ ПРОДАКШЕМ ИЛИ ДЕВЕЛОПМЕНТ
        mode,
        // ТОЧКА ВХОДА - СТРОКОЙ ИЛИ ОБЪЕКТОМ, ЕСЛИ НАМ НУЖНО НЕСКОЛЬКО
        // В БАНДЛЕ СОЗДАДУТСЯ ФАЙЛЫ JS С ТОЧКАМИ ВХОДА
        entry: paths.entry,
        // ВЫХОД - УКАЗЫВАЕТСЯ ФАЙЛНЕЙМ, В КВАДРАТНЫХ СКОБКАХ ЕСЛИ ДИНАМИЧЕСКОЕ НАЗВАНИЕ
        // contenthash УДАЛЯЕТ ФАЙЛЫ ПРЕДЫДУЩИХ СБОРОКб РЕШАЕТ ПРОБЛЕМУ КЭША
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
        },
        module: {
            // САМОЕ ВАЖНОЕ
            // ЛЮБАЯ ОБРАБОТКА ФАЙЛОМ ВЫХОДЯЩИЕ ЗА ПРЕДЕЛЫ ЖС
            // В НАШЕ СЛУЧАЕ ФАЙЛЫ TS И TSX
            rules: buildLoaders(options),
        },
        // RESOLVE ОТВЕЧАЕТ ЗА ИМПОРТ КОМПОНЕНТОВ БЕЗ УКАЗАНИЯ РАСШИРЕНИЯ ФАЙЛА
        resolve: buildResolvers(options),
        plugins: buildPlugins(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,

    };
}
