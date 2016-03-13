/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ru.insoft.archive.sic.storages.repos;

import java.util.List;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import ru.insoft.archive.sic.storages.Application;
import ru.insoft.archive.sic.storages.domain.admin.DescriptorValue;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {Application.class})
@ActiveProfiles("test")
public class DescriptorValueRepoTest {
    
    @Autowired
    private DescriptorValueRepo repo;

    @Test
    public void testFindOne() {
        Long id = 1111l;
        DescriptorValue expResult = null;
        DescriptorValue result = repo.findOne(id);
        assertEquals(expResult, result);
        assertEquals(Long.valueOf(1), repo.findOne(1l).getId());
    }

    @Test
    public void testFindByGroupCode() {
        String code = "USER_TYPE";
        List<DescriptorValue> result = repo.findByGroupCode(code);
        assertFalse(result.isEmpty());
        code = null;
        result = repo.findByGroupCode(code);
        assertTrue(result.isEmpty());
    }

    @Test
    public void testFindByParent() {
        DescriptorValue parent = null;
        List<DescriptorValue> result = repo.findByParent(parent);
        assertTrue(result.isEmpty());
        parent = repo.findOne(6l);
        assertNotNull(parent);
        result = repo.findByParent(parent);
        assertFalse(result.isEmpty());
    }

    @Ignore
    @Test
    public void testFindByAttrDescriptor() {
        System.out.println("findByAttrDescriptor");
        String code = "";
        List<DescriptorValue> expResult = null;
        List<DescriptorValue> result = repo.findByAttrDescriptor(code);
        assertEquals(expResult, result);
        fail("The test case is a prototype.");
    }

    @Test
    public void testFindOneByCodeAndGroup_Code() {
        String code = "ARCHIVE";
        String groupCode = "ORG_STRUCTURE_TYPE";
        DescriptorValue result = repo.findOneByCodeAndGroup_Code(code, groupCode);
        assertEquals(code, result.getCode());
    }
    
}
