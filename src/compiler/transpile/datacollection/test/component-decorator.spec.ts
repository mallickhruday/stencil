import { ENCAPSULATION } from '../../../../util/constants';
import { getComponentDecoratorMeta } from '../component-decorator';
import { gatherMetadata } from './test-utils';
import * as path from 'path';


describe('component decorator', () => {

  describe('getComponentDecoratorMeta', () => {
    it('simple decorator', () => {
      let response;
      const sourceFilePath = path.resolve(__dirname, './fixtures/component-simple');
      gatherMetadata(sourceFilePath, (checker, classNode) => {
        response = getComponentDecoratorMeta([], checker, classNode);
      });

      expect(response).toEqual({
        tagNameMeta: 'ion-action-sheet',
        stylesMeta: {},
        encapsulationMeta: ENCAPSULATION.NoEncapsulation,
        jsdoc: {
          documentation: '',
          name: 'ActionSheet',
          type: 'typeof ActionSheet'
        },
        assetsDirsMeta: [],
        dependencies: []
      });
    });

    it('shadow encapsulation', () => {
      let response;
      const sourceFilePath = path.resolve(__dirname, './fixtures/component-shadow');
      gatherMetadata(sourceFilePath, (checker, classNode) => {
        response = getComponentDecoratorMeta([], checker, classNode);
      });

      expect(response).toEqual({
        tagNameMeta: 'ion-action-sheet',
        stylesMeta: {},
        encapsulationMeta: ENCAPSULATION.ShadowDom,
        jsdoc: {
          documentation: '',
          name: 'ActionSheet',
          type: 'typeof ActionSheet'
        },
        assetsDirsMeta: [],
        dependencies: []
      });
    });

    it('scoped encapsulation', () => {
      let response;
      const sourceFilePath = path.resolve(__dirname, './fixtures/component-scoped');
      gatherMetadata(sourceFilePath, (checker, classNode) => {
        response = getComponentDecoratorMeta([], checker, classNode);
      });

      expect(response).toEqual({
        tagNameMeta: 'ion-action-sheet',
        stylesMeta: {},
        assetsDirsMeta: [],
        encapsulationMeta: ENCAPSULATION.ScopedCss,
        jsdoc: {
          documentation: '',
          name: 'ActionSheet',
          type: 'typeof ActionSheet'
        },
        dependencies: []
      });
    });

    it('should gather jsdoc and hostmeta and styles', () => {
      let response;
      const sourceFilePath = path.resolve(__dirname, './fixtures/component-example');
      gatherMetadata(sourceFilePath, (checker, classNode) => {
        response = getComponentDecoratorMeta([], checker, classNode);
      });

      expect(response).toEqual({
        tagNameMeta: 'ion-action-sheet',
        encapsulationMeta: ENCAPSULATION.NoEncapsulation,
        jsdoc: {
          documentation: 'This is an actionSheet class',
          name: 'ActionSheet',
          type: 'typeof ActionSheet'
        },
        stylesMeta: {
          ios: {
            externalStyles: [
              {
                originalComponentPath: 'action-sheet.ios.scss'
              }
            ]
          },
          md: {
            externalStyles: [
              {
                originalComponentPath: 'action-sheet.md.scss'
              }
            ]
          }
        },
        assetsDirsMeta: [],
        dependencies: []
      });
    });
  });
});
