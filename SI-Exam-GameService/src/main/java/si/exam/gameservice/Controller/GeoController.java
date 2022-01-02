package si.exam.gameservice.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import si.exam.gameservice.wsdl.GeoIPServiceLocator;
import si.exam.gameservice.wsdl.GeoIPServiceSoap_PortType;

import javax.xml.rpc.ServiceException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.rmi.RemoteException;

@RestController
public class GeoController {

    @RequestMapping("/iplocator")
    public String ipLocator() throws IOException {
        String stringbuilder = "IP: ";
        String ip = null;
        try
        {
            URL whatismyip = new URL("http://checkip.amazonaws.com");
            BufferedReader in = new BufferedReader(new InputStreamReader(
                    whatismyip.openStream()));

            ip = in.readLine();

            GeoIPServiceLocator locator = new GeoIPServiceLocator();
            GeoIPServiceSoap_PortType service = locator.getGeoIPServiceSoap();

            stringbuilder += ip;
            String country = (service.getIpLocation(ip)).substring(16,18);
            stringbuilder += " - Located in " + service.getCountryNameByISO2(country);
        }
        catch (ServiceException | RemoteException ex)
        {
            ex.printStackTrace();
        }
        return stringbuilder;
    }
}
